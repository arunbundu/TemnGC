
var loneAffix = (function () {

    function isPrefix(word) {
        //expects an string
        return HelperFunctions.checkArrayItemsToTheRight(word, "h",
            HelperFunctions.addStringToArrayItems(utterances.getTemneLetters(), "\u0301"));

    }

    function isSuffix(word) {
        //expects an string
        return HelperFunctions.checkArrayItemsToTheLeft(word, "h",
            HelperFunctions.addStringToArrayItems(utterances.getTemneLetters(), "\u0301"));
    }

    function getAffixes(words) {

        var newArr = [];

        for (var i = 0; i < words.length; i++) {
            //console.log(words[i], isSuffix(words[i]));
            if (isPrefix(words[i]) || isSuffix(words[i])) {

                newArr.push(words[i]);

            }

        }

        var temp = HelperFunctions.filterWordsContainingText(words, newArr);

        return {
            affixes: temp.nuvo,
            left: temp.old

        }

    }

    function fixLoneAffixes(list) {

        list.forEach(function (index) {
           // console.log(index.replace("\u0304", ""));
            goFetch.getOnline([index, index.replace("\u0304", "")], url).then(res => {

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
        fixLoneAffixes: fixLoneAffixes
    }
})();
