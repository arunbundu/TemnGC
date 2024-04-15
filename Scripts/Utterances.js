


var utterances = (function () {

    var allTemneLetters = ["a", "m", "n", "s", "e",
        "r", "ŋ", "ɪ", "i", "j",
        "θ", "t", "o", "b", "d",
        "ɱ", "u", "l", "β", "f",
        "ɔ", "k", "w", "x", "ɛ", "z",
        "c", "g", "ʌ", "y", "p", "ʂ",
        "ə", "h́", "ʒ", "v", "h",
        "-", "q", "\u0301",
        "\u0300", "\u0305", "\u0020", "\u0304",
        "'", "ħ", "ɦ"];

    var oldColour = "";

    let overHover = function () {
        // aprantly who ever class the function gets to be called "this"
        if (this.className == "highlight") {
            oldColour = this.style.backgroundColor;
            //console.log(oldColour);
            this.style.backgroundColor = 'red';
        } else if (this.className == "highlighted") {
            oldColour = this.style.backgroundColor;
            //console.log(oldColour);
            this.style.backgroundColor = '#bac7db';
        }

    };

    let overNoMore = function () {
        this.style.backgroundColor = oldColour;
    }

    function getTemneLetters() {
        return allTemneLetters;
    }


    function getUtterances(words) {
        //expects a string array
        var tempUtter = [];
        var tmpStr = [];
        var results = [];
        var p = 1;
		
        for (var i = 0; i < words.length; i++) {
            //collect the word and break it
            tempStr = words[i].split("-");
            tempUtter.push(words[i].replace("'ħ", "'h").replace("ɦ", "h́")); // save the word signature

            for (var q = 0; q < tempStr.length; q++) {

                if (q > 0 && tempStr[q].indexOf('q') >= 0) {
                    //ensure that down the road -q'a are taken care of
                    continue;

                }

                tempUtter.push(tempStr[q]); //collect the pieces of the word
            }

            results.push(tempUtter);
            tempUtter = [];
            tmpStr = [];
        }

        //morhpemize the word
        //console.log(results);
        var results2 = JSON.parse(JSON.stringify(results));
        results2 = morphemes.getMorphemes(results2);
		//console.log(results2[0]);
        return results2;
    }

    function displayUtterances(div) {

        var displayText = div.innerText.substr(0, 5000);
        displayText = displayText.split("");
        displayText = HelperFunctions.replaceAllOccurrences(displayText, "\n", '<br/> ');

        displayText = displayText.join("");
        var utters = displayText.split(" ");
        var highlightedText = "";

        for (var i = 0; i < utters.length; i++) {
            highlightedText += '<span class="highlight">' + utters[i] + ' </span>';
        }

        div.innerHTML = highlightedText;
    }

    function activateDeadUtterances() {

        var highlightElements = document.querySelectorAll('.highlight');
        var oldColour = "";

        highlightElements.forEach(function (element) {
            element.addEventListener('mouseover', overHover);

            element.addEventListener('mouseout', overNoMore);
        });

    }

    function crack(utterances) {
        //console.log(utterances);
        var newArr = [];
        var temp = {};
        //expects utterances
        for (var i = 0; i < utterances.length; i++) {

            for (var q = 1; q < utterances[i].length; q++) {

                temp = {
                    sign: utterances[i][0],
                    root: utterances[i][q].root[0],
                    affixes: utterances[i][q].affixes,
                    order: utterances[i][q].order,
                    speechClass: utterances[i][q].speechClass
                }
                newArr.push(JSON.parse(JSON.stringify(temp)));

            }

        }

        return newArr;
    }

    function crackWholes(utterances) {
        var newArr = [];
        //expects utterances
		//console.log(utterances);
        for (var i = 0; i < utterances.length; i++) {

            newArr.push(utterances[i][0]);
        }
        return newArr;
    }

    function colourCode(section, utterances, sClass = ".highlight") {
        // expects array
        var CurrentSpan;
        var temp = "";
        var temp2 = "";
		
		if(typeof section === "undefined"){return;}

        CurrentSpan = document.querySelectorAll("span" + sClass);

        CurrentSpan.forEach(function (span) {

            for (var i = 0; i < utterances.length; i++) {

                //clean up both inputs fro processing
                temp = WordSplitter.wordCleaner(span.innerText);
                temp = temp.replace(/\s/g, "");

                temp2 = WordSplitter.wordCleaner(utterances[i]);

                
                if (temp == temp2) {

                    // Perform desired operations on the selected span element here
					//console.log(section,i, temp, temp2);
                    switch (section) {
                    case "Noun":
					//console.log(section,i, temp, temp2);
                        span.style.backgroundColor = "#99ffcc";

                        span.id = "noun" + i;
                        break;
                    case "Verb":
                        span.style.backgroundColor = "#9999ff";

                        span.id = "verb" + i;
                        break;
                    case "Adjective":
                        span.style.backgroundColor = "#ad4809";

                        span.id = "adjective" + i;
                        break;
                    case "NotInDict":
                        span.style.backgroundColor = "yellow";
                        break;
                    case "Pronoun":
                        span.style.backgroundColor = "#66ff66";

                        span.id = "pronoun" + i;
                        break;
                    case "Conjunction":
                        span.style.backgroundColor = "#4287f5";

                        span.id = "conjunction" + i;
                        break;
                    case "Lone Letter":
                        span.style.backgroundColor = "#669999";

                        span.id = "loneLetter" + i;
                        break;
                    case "Lone Affixes":
                        span.style.backgroundColor = "#cc33ff";

                        span.id = "loneAffix" + i;
                        break;

                    }
                    span.className = "highlighted";
                }

            }
        });

    }

    return {
        getUtterances: getUtterances,
        getTemneLetters: getTemneLetters,
        displayUtterances: displayUtterances,
        activateDeadUtterances: activateDeadUtterances,
        crack: crack,
        crackWholes: crackWholes,
        colourCode: colourCode

    }

})();
