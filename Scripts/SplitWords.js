

var WordSplitter = (function () {

    function seperateOpenAndClosedWordClasses(book) {
//console.log('H');
        var rawReturn = HelperFunctions.filterWordsContainingText(book, ["'", "ħ"]);
		var rawReturn2= HelperFunctions.filterWordsContainingTextByIndexAndLength(rawReturn.old, ["\u0300"], 1,3);

        var abrir = rawReturn.nuvo.concat(rawReturn2.nuvo);
//console.log(abrir);
        var cerrado = rawReturn2.old;

        return {
            abrir: abrir,
            cerrado: cerrado
        }

    }

    function splitWords(words) {

        var filtered;
        words = words.split(" ");

        filtered = seperateOpenAndClosedWordClasses(words);

        return filtered;
    }

    function wordCleaner(word) {
        //expects a string
        var mixedRaw = word.split("");
        mixedRaw = HelperFunctions.replaceAllOccurrences(mixedRaw, "\n", '<br/> ');

        mixedRaw = mixedRaw.join("");
        //console.log(mixedRaw);
        mixedRaw = mixedRaw.replaceAll("’", "'");
        mixedRaw = mixedRaw.replaceAll("‘", "'");
        mixedRaw = mixedRaw.replaceAll("'h", "'ħ");
        mixedRaw = mixedRaw.replaceAll("h́", "ɦ");
        mixedRaw = mixedRaw.replaceAll('\u03F4', "θ"); //replace fat θ
        mixedRaw = mixedRaw.replaceAll('<br/> ', " ");

        mixedRaw = HelperFunctions.removeUnapprovedCharacters(
                mixedRaw, utterances.getTemneLetters());
				
		return mixedRaw;

    }

    return {

        splitWords: splitWords,
		wordCleaner : wordCleaner

    }

})();















