		/**
	 * 
	 * Rule format:
	 * {
	 *   triggerStr: string,
	 *   enemyStr: string,
	 *   enemyStrikeZonePreceding: number,
	 *   enemyStrikeZonePostceding: number,
	 *   neutralizerStr: string,
	 *   neutralizerStrikeZonePreceding: number,
	 *   neutralizerStrikeZonePostceding: number
	 * }
	 */

const listOfTriggeredStrings=[];


var neighborHood = (function () {


	var firstWordEver="";

    function collectSpans(spanSelector) {
        var nodeList = document.querySelectorAll(spanSelector);
		if(nodeList.length <= 0){return [];}
		firstWordEver= WordSplitter.wordCleanerNOTH(nodeList[0].innerText.trim());
        return Array.prototype.slice.call(nodeList);
    }

	
    function buildThreeSpanWindows(spans) {
        var windows = [];

        for (var i = 0; i < spans.length; i++) {
            var windowSpans = [];
            var windowIndices = [];

            for (var j = 0; j < 6; j++) {
                if (i + j >= spans.length) break;
                windowSpans.push(spans[i + j]);
                windowIndices.push(i + j);
            }

            windows.push({
                spans: windowSpans,
                indices: windowIndices,
                texti: WordSplitter.wordCleanerNOTH(joinSpanTexts(windowSpans))

                // We'll add properties later:
                // hasTrigger: true/false
                // triggerMatches: [...]
            });
        }

        return windows;
    }


    function markWindowsThatContainTriggers(windows, triggerRules = triggerWords) {
		/*
		 * Mutates each window object:
		 *   window.hasTrigger = true/false
		 *   window.triggerMatches = array of matches
		 *
		 * triggerRules: array of objects with at least { triggerStr }

		upon looking at a window
		go get a trigger str
		build its tirgs
		compare the trigs to the window
		check all the other trigs agains this window
		move to the next window
if the trigger str wasnt the last one used then use it to colour the span
the same trigger can iniciate a colouring 6 times
		 */

		var newWindows = [];
		var jump =-1;
		var win;
		var rule;
		var workingWinText;
		var triggers;
		var oldTriggers=[];
		var oldWindows = [];
		 
        for (var w = 0; w < windows.length; w++) {
            var win = windows[w];

            // default state for every window
            win.hasTrigger = false;
            win.triggerMatches = [];

            // check all trigger words against this window
            for (var r = 0; r < triggerRules.length; r++) {
                rule = triggerRules[r];
				workingWinText = win.texti.replaceAll("  "," ").trim();

                if (workingWinText.indexOf(rule.triggerStr.replace("'-","'")) <0) continue;
		//console.log(rule);		
				
                triggers = triggerBuilder(workingWinText, rule, w);
	
				//can the trigger be found in the 2nd arr?
				var seeIfWindowTextHasATrigg = HelperFunctions.filterWordsContainingTextByPropSmallSpoon([workingWinText], triggers,"pattern").nuvo;
				var seeIfOldTriggersHasTrigg = HelperFunctions.filterWordsContainingText(oldTriggers, [rule.triggerStr]).nuvo.length;
				
				

//console.log([workingWinText], triggers, seeIfOldTriggersHasTrigg); //false positive

                if (seeIfWindowTextHasATrigg.length > 0
					&& seeIfOldTriggersHasTrigg < 6 &&
					oldWindows.indexOf(workingWinText) < 0) {
//console.log([workingWinText], triggers, seeIfOldTriggersHasTrigg); //false negatives
					

					if(oldTriggers.length > 1){
						//console.log(oldTriggers);
						oldTriggers = [];
						}
					if(oldWindows.length > 1){
						//console.log(oldTriggers);
						oldWindows = [];
						}

                    win.hasTrigger = true;

                    // store details about what matched
                    win.triggerMatches.push({
                        triggerStr: seeIfWindowTextHasATrigg[0].pattern,
						triggerindex: r,
						triggerBuilt: rule.triggerStr,
						triggerOrigin: seeIfWindowTextHasATrigg[0].rawTrigger
                    });
					
					reddenSpans(win.spans, seeIfWindowTextHasATrigg[0], rule.triggerStr);
					listOfTriggeredStrings.push(seeIfWindowTextHasATrigg[0].pattern);
					//make the newWindows and make sure to jump
					newWindows.push(win);
					oldTriggers.push(rule.triggerStr);
					oldWindows.push(workingWinText);
                }
            }
        }

        return newWindows; // return for convenience (even though we mutated in place)
    }


	function reddenSpans(spans, triggStr, origin) {
		// bigSpoon  = texti (array of all words)
		// smallSpoon = origin.split(" ")
		// If smallSpoon appears inside bigSpoon, redden ONLY the span where the match begins.

		if (!triggStr || !origin) return;

		// Build bigSpoon (all words)
		var texti = [];

		for (var s = 0; s < spans.length; s++) {
			var cleaned = WordSplitter.wordCleanerNOTH(spans[s].innerText).trim();
			//compare clean to clean for better
			cleaned = HelperFunctions.removeUnapprovedCharacters(
                cleaned, utterances.getTemneLetters());
			if (!cleaned) continue;
			texti.push(cleaned);
		}

		// If little spoon ends with '-', expand it using the big spoon sentence
		// BEFORE splitting into tokens.
		if (origin.endsWith("'-")) {

			var bigSentence = texti.join(" ");
			var idx = bigSentence.indexOf(origin.replace("'-","'"));

			if (idx > -1) {
				// grab from where the origin starts to the end of the sentence
				origin = bigSentence.substring(idx).trim();
			}
		}
			
		//compare clean to clean for better
		var smallSpoon = HelperFunctions.removeUnapprovedCharacters(
                origin, utterances.getTemneLetters()).split(" ");

		//console.log(texti, smallSpoon);

		// If big spoon is too small, nothing to do
		if (texti.length < smallSpoon.length) return;

		// Subarray search: find smallSpoon inside texti
		for (var start = 0; start <= texti.length - smallSpoon.length; start++) {
			var match = true;

			for (var j = 0; j < smallSpoon.length; j++) {
				if (texti[start + j] !== smallSpoon[j]) {
					match = false;
					break;
				}
			}

			if (match) {
				// Redden only the span where the match begins
				var spanIndex = start;
				spans[spanIndex].classList.add("bigRed");
				
				return; // stop after first match
			}
		}
	}


    function joinSpanTexts(spanArray) {
        var parts = [];
        for (var i = 0; i < spanArray.length; i++) {
            parts.push(spanArray[i].innerText);
        }
        return parts.join(" ");
    }
	
	
	function triggerBuilder(windowText, triggerRules, windowIndex){
		//trigger rules= trigger map
		//go into the rules.enemyStr
		//for each rule split by +
		//for each word in the plan is it a function word?
		// if yest execute said function
        //build the word pattern
		//you have built unique maps to test agaiins for mistakes
		//for the first word in a text just store it in a variable so you can check it agains begin here
		//also keep track of the first window as well for a discrete tagger
		//console.log(windowText);
		var triggers =[];
		var settledPattern="";
		var rawTrigger;
		
		triggerRules.enemyStr.forEach((wordPattern) =>{
			
			rawTrigger = wordPattern.split("+");
			settledPattern="";
			//console.log(rawTrigger);
			var invalid = false;

			rawTrigger.forEach((word) => {
				
				if (invalid) return;

				word = goGetCartegory(windowText, word, settledPattern, windowIndex);
//console.log(word);
				if (/[A-Z]/.test(word)) {
					invalid = true;
					return;
				}

				settledPattern += word.trim() + " ";
				settledPattern = settledPattern.replaceAll("  "," ");
			});


//console.log(settledPattern);
			//clean joining dots
			settledPattern = settledPattern.replace(" ..."," Q...").replace(" .",".").replace(" Q..."," ...");

			if(settledPattern.indexOf("0") ==0){
				
				settledPattern = settledPattern.replace("0","");

			}

			if (!invalid) {
			triggers.push({"pattern" : settledPattern.trim(), "rawTrigger": rawTrigger});
			}


		});
	
		return triggers;
	}
	




    return {
        collectSpans: collectSpans,
        buildThreeSpanWindows: buildThreeSpanWindows,
        markWindowsThatContainTriggers: markWindowsThatContainTriggers
    };

})();















	