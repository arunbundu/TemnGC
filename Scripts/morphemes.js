


var morphemes = (function () {

    function getWhole(words) {
        //expects a 2d array

        var temp = "";
        for (var i = 0; i < words.length; i++) { //collect the utterances

            for (var q = words[i].length - 1; q > 1; q--) {
                //fetch the class and attach it to every tail word

                if (words[i][1].indexOf("'h") > -1 && words[i][1].indexOf("'h") < 4 ) {
                    //for tail adjectives
                    temp = words[i][1].
                        substr(0, words[i][1].indexOf("'") + 1) + "ħ" +
                        words[i][q];
                    words[i][q] = temp;

                } else {

                    temp = words[i][1].
                        substr(0, words[i][1].indexOf("'") + 1) +
                        words[i][q];

                    words[i][q] = temp;

                }

            }

        }
        return words;
    }

    function getAffixes(words) {
        //expects a 2d array
		
        var temp, temp2;
        var tooth;
        var results = [];
        var wordParts = [];
        var words2 = JSON.parse(JSON.stringify(words));
        for (var i = 0; i < words.length; i++) { //collect the utterances

            for (var q = words[i].length - 1; q > 0; q--) {

                //console.log(words[i][q]);
                //fetch the words after the apostrophe
				if(words[i][q].indexOf("'") >-1){
					
					temp = words2[i][q].
                    substr(words[i][q].indexOf("'"));
					
				}else if(words[i][q].indexOf("\u0300") ==1){
					
					temp = words2[i][q];
					
				}
                
                //split the words usng h as delimeter
				//console.log(temp);
                temp = HelperFunctions.splitStringWithDelimiter(temp, "h");

				//temp2= JSON.parse(JSON.stringify(temp));
                //seperate the affixes from the root
                wordParts = HelperFunctions.
                    filterWordsContainingText(temp, ["\u0301"]);
                //console.log(temp, wordParts);
                //error handeling
                if (typeof wordParts.old[0] === "undefined") {
                    //console.log(wordParts);
                    words2[i][0] = '';
                    words2[i][q] = {
                        'whole': 'n/A',
                        'root': 'n/A',
                        'affixes': 'n/A',
                        'order': 0,
                        'speechClass': "n/A"
                    }
                    continue;
                }

                //return the hs back to their original form
                wordParts.old[0] = wordParts.old[0].replace("'ħ", "'h");
                wordParts.old[0] = wordParts.old[0].replace("ɦ", "h́");
                wordParts.nuvo = HelperFunctions.arrReplaceAll(wordParts.nuvo, "'ə́", "");
                wordParts.nuvo = HelperFunctions.replaceAllOccurrences(wordParts.nuvo, "'", "");
                //console.log(wordParts);
                words2[i][q] = {
                    'whole': HelperFunctions.copyString(words2[i][q].replace("ɸNAMEɸ'", "")),
                    'root': wordParts.old,
                    'affixes': wordParts.nuvo,
                    'order': 0,
                    'speechClass': words2[i][q].speechClass
                }
                //if this particular word happens to be classes please handle it properly
                if (HelperFunctions.
                    filterWordsContainingTextByIndex([words2[i][0]], ["h'ə́h"], 0).nuvo.length > 0) {

                    words2[i][q].root[0] = words2[i][q].whole;
                    //console.log(words[i][q].root);

                }
				
				temp="";
            }

        }

        //console.log(words2);
        var isolate = JSON.parse(JSON.stringify(words2));
        return isolate;
    }

    function cleanAffixes(word) {
        //expects an object
        var temp = word.whole;

        for (var i = 0; i < word.affixes.length; i++) {
            //check if the affix is in the word
            if (temp.indexOf(word.affixes[i]) > -1) {
                //check for affixes
                if ((temp.indexOf(word.affixes[i]) < temp.indexOf(word.root[0]) &&
                        temp.indexOf(word.affixes[i]) > 0) || word.root[0].length < 1) {

                    word.affixes[i] += "h";
                    //suffixes
                } else if (temp.indexOf(word.affixes[i]) > temp.indexOf(word.root[0])) {

                    word.affixes[i] = "h" + word.affixes[i];
                    //prefixes
                }

            }

        }

        return word;
    }

    function getMorphemes(words) {

        var mixed = getWhole(words);

        mixed = getAffixes(mixed);

        //mixed[a] == utter level
        //mixed[a][b] == words
        //cleanAffixes
        for (var q = 0; q < mixed.length; q++) {
            //filter throught the uutters
            for (var w = 1; w < mixed[q].length; w++) {
                //filter throught the words

                cleanAffixes(mixed[q][w]); //clean each word object

            }

        }
        //console.log(mixed);
        return mixed;
    }

    return {
        getWhole: getWhole,
        getAffixes: getAffixes,
        getMorphemes: getMorphemes

    }

})();
