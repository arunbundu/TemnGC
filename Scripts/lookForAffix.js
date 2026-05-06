
var loneAffix = (function () {

    function isPrefix(word) {
        //expects an string
		if(HelperFunctions. countSubstring(word, "\u0301") > 1){ return false;}
        return HelperFunctions.checkArrayItemsToTheRight(word, "h",
            HelperFunctions.addStringToArrayItems(utterances.getTemneLetters(), "\u0301"));

    }

    function isSuffix(word) {
		
        //expects an string
		if(HelperFunctions. countSubstring(word, "\u0301") > 1){ 
		
		//console.log(word);
		return false;}
        return HelperFunctions.checkArrayItemsToTheLeft(word, "h",
            HelperFunctions.addStringToArrayItems(utterances.getTemneLetters(), "\u0301"));
    }

    function getAffixes(words) {
		//console.log(words);

        var newArr = [];

        for (var i = 0; i < words.length; i++) {
            //console.log(words[i], isSuffix(words[i]));
            if (isPrefix(words[i]) || isSuffix(words[i])) {

                newArr.push(words[i]);

            }else{
			
			}

        }

        var temp = HelperFunctions.filterWordsContainingText(words, newArr);
        return {
            affixes: temp.nuvo,
            left: temp.old

        }

    }
	
	    function getLoneAffixes(words) {
			//expects anarray of words
		//console.log(words);

        var newArr = [];

        for (var i = 0; i < words.length; i++) {
            //console.log(words[i], isSuffix(words[i]));
            if (isPrefix(words[i]) || isSuffix(words[i])) {

                newArr.push(words[i]);

            }else{
			//console.log(words[i]);	
			}

        }


        return newArr;

    }

    function fixLoneAffixes(list) {

        list.forEach(function (index) {
			
          // console.log(HelperFunctions.removeCharacters(index, ["\u0304","-q"]));
		
            goFetch.getOnline([index, HelperFunctions.trimWordsAtMarkers(list, ["\u0304","-q"])], url).then(res => {

                //console.log(res);
                if (res[0][0].rows.length < 1 &&
                    res[1][0].rows.length < 1 &&
                    res[2][0].rows.length < 1 &&
                    res[3][0].rows.length < 1) {

                    utterances.colourCode("NotInDict", [index], ".highlighted");

                }

            });

        });

    }

    return {
        getAffixes: getAffixes,
        fixLoneAffixes: fixLoneAffixes,
		getLoneAffixes: getLoneAffixes
    }
})();
