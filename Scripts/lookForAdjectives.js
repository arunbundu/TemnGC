


var lookForAdjectives = (function () {

    function getAdjectives(words) {
        var raw = HelperFunctions
            .filterWordsContainingTextWithInterval
            (words, ["'ɥ"], 0, 4);

        return {
            adjectives: utterances.getUtterances(raw.nuvo),
            left: raw.old
        };

    }

    return {
        getAdjectives: getAdjectives

    }

})();
