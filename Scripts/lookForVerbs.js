

var lookForVerbs = (function () {

    function subjectVerbs(book) {
        //expects a string array
        var subjectPronum = lookForPronouns.subjectPronouns();
        subjectPronum = HelperFunctions.creatArrayFromObjectProperty(subjectPronum, "name")
            //console.log(book);
            return HelperFunctions.filterWordsContainingTextByIndex_WithIgnore
            (book, subjectPronum, 0, "'ɥ");
    }

    function genVerbs(book) {
        //expects a string array
        return HelperFunctions.filterWordsContainingTextByIndex_WithIgnore
        (book, ["'"], 0, "'ɥ");
    }

    function infiniteVerbs(book) {
        //expects a string array
        return HelperFunctions.filterWordsContainingTextByIndex(book, ["tʌkʌ'"], 0);
    }

    function infiniteShortVerbs(book) {
        //expects a string array
        return HelperFunctions.filterWordsContainingTextByIndex(book, ["k'"], 0);
    }

    function definiteVerbs(book) {
        //expects a string array
        return HelperFunctions.filterWordsContainingTextByIndex(book, ["ḱ'","t'","t́'"], 0);
    }

    function cleanVerbs(words) {
 
        //expects utterances
        for (var i = 0; i < words.length; i++) {
            //take in all the utterances
            for (var q = 1; q < words[i].length; q++) { //take in all the words
                words[i][q].root[0] = "tʌkʌ'" +
                    words[i][q].root[0].substr(words[i][q].root[0].indexOf("'")+1);

            }

        }
        return words;

    }

    function getVerbs(words) {
        //expects a string array
        var nounMix = subjectVerbs(words);
        //console.log(nounMix);
        FsubjectVerbs = utterances.getUtterances(nounMix.nuvo);
        FsubjectVerbs = cleanVerbs(FsubjectVerbs);

        nounMix = genVerbs(nounMix.old);
        FgenVerbs = utterances.getUtterances(nounMix.nuvo);
        FgenVerbs = cleanVerbs(FgenVerbs);

        nounMix = infiniteVerbs(nounMix.old);
        FinfiniteVerbs = utterances.getUtterances(nounMix.nuvo);
        FinfiniteVerbs = cleanVerbs(FinfiniteVerbs);

        nounMix = infiniteShortVerbs(nounMix.old);
        FinfiniteShortVerbs = utterances.getUtterances(nounMix.nuvo);
        FinfiniteShortVerbs = cleanVerbs(FinfiniteShortVerbs);

        nounMix = definiteVerbs(nounMix.old);
        FdefiniteVerbs = utterances.getUtterances(nounMix.nuvo);
        FdefiniteVerbs = cleanVerbs(FdefiniteVerbs);

        return {
            subjectVerbs: FsubjectVerbs,
            genVerbs: FgenVerbs,
            infiniteVerbs: FinfiniteVerbs,
            infiniteShortVerbs: FinfiniteShortVerbs,
            left: nounMix.old,
            definiteVerbs: FdefiniteVerbs,
            takeAll: FsubjectVerbs.concat(FgenVerbs, FinfiniteVerbs, FinfiniteShortVerbs, FdefiniteVerbs)
        };

    }

    return {
        subjectVerbs: subjectVerbs,
        genVerbs: genVerbs,
        getVerbs: getVerbs

    }

})();
