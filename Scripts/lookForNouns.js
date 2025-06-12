var lookForNouns = (function () {

    function definiteNouns(words) {
		//console.log(words);
        var definteClasses = [
            "áŋ'", "mə́'", "nə́'",
            "rə́'", "tə́'", "də́'",
            "ɔ́'", "kə́'", "ɛ́'", "ə́ŋ'"];
			//console.log(HelperFunctions.filterWordsContainingText(words, definteClasses))
        return HelperFunctions.filterWordsContainingTextByIndex(words, definteClasses,0);
    }

    function indefiniteNouns(words) {
        //expects a string array
		//console.log('H');
        var indefinteClasses = [
            "à'", "m̀ʌ'", "ǹʌ'",
            "r̀ʌ'", "t̀ʌ'", "d̀ʌ'",
            "ù'", "k̀ʌ'", "ɛ̀'", "ə̀'"];
        return HelperFunctions.filterWordsContainingText(words, indefinteClasses);
    }

    function classlessNouns(words) {
        //expects a string array
		//console.log(words);
        return HelperFunctions.filterWordsContainingTextByIndex(words,
            ["h'","nɔ́'",
            "ró'", "dó'"], 0);
    }

    function nameNouns(words) {
        //expects a string array
		//console.log(words);
        return HelperFunctions.filterWordsContainingTextByIndex(words,
            ["\u0300"], 1);
    }

    function cleanDefiniteRoots(words) {
        //expects utterances
        for (var i = 0; i < words.length; i++) {
            //take in all the utterances
            for (var q = 1; q < words[i].length; q++) { //take in all the words

                words[i][q].root[0] = words[i][0].substr(0, words[i][0].indexOf("'") + 1) +
                    words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
            }

        }
        return words;
    }

    function cleanInDefiniteRoots(words) {
        var temp = "";
        //expects utterances
        for (var i = 0; i < words.length; i++) {
            //take in all the utterances
            for (var q = 1; q < words[i].length; q++) { //take in all the words

                temp = words[i][0].substr(0, words[i][0].indexOf("'"));

                    switch (temp) {
                    case "r̀ʌ":
                        words[i][q].root[0] = "rə́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "ə̀":
                        words[i][q].root[0] = "ə́ŋ'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "ɛ̀":
                        words[i][q].root[0] = "ɛ́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "d̀ʌ":
                        words[i][q].root[0] = "də́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "m̀ʌ":
                        words[i][q].root[0] = "mə́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "t̀ʌ":
                        words[i][q].root[0] = "tə́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "ǹʌ":
                        words[i][q].root[0] = "nə́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "k̀ʌ":
                        words[i][q].root[0] = "kə́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "p̀ʌ":
                        words[i][q].root[0] = "pə́'" + words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "ù":
                        words[i][q].root[0] = "ɔ́'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                        break;
                    case "à":
                        words[i][q].root[0] = "áŋ'" +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);
                    }

            }

        }
        return words;

    }

    function cleanClassLessRoots(words) {
        //expects utterances
        var singularDefinteClasses = [
            "mə́'","h'",
            "rə́'", "də́'","h'ə́h",
            "ɔ́'", "kə́'", "ə́ŋ'",
            "ró'", "dó'"];

        newArr = [];

		var words2= JSON.parse(JSON.stringify(words));
		//console.log(words);
        for (var i = 0; i < words2.length; i++) {
            //take in all the utterances
            for (var q = 1; q < words2[i].length; q++) { //take in all the words

                if (words2[i][q].root[0].indexOf("h'ə́h") != 0) {
					//console.log("hey");
                    for (var p = 0; p < singularDefinteClasses.length; p++) { //take in all the words
                        words2[i][q].root[0] = singularDefinteClasses[p] +
                            words[i][q].root[0].substr(words[i][q].root[0].indexOf("'") + 1);

                        words2[i][q].order = p;
                        words2[i][q].speechClass = "Noun";

                        newArr.push(JSON.parse(JSON.stringify(words2[i]))); //duplicate the word for ever singular class, java script stores data by reference so I had to deep clone this item
                    }
                } else {

                    newArr.push(words2[i]);

                }

            }

        }
        return newArr;
    }

    function getNouns(words) {
        //expects a string array
		//console.log(words);

        var nounMix = definiteNouns(words);
        FdefiniteNouns = utterances.getUtterances(nounMix.nuvo);
        FdefiniteNouns = cleanDefiniteRoots(FdefiniteNouns);

        nounMix = indefiniteNouns(nounMix.old);
		//console.log(nounMix);
        FindefiniteNouns = utterances.getUtterances(nounMix.nuvo);
        FindefiniteNouns = cleanInDefiniteRoots(FindefiniteNouns);

        nounMix = classlessNouns(nounMix.old);
		//console.log(nounMix);
        FclasslessNouns = utterances.getUtterances(nounMix.nuvo);
        FclasslessNouns = cleanClassLessRoots(FclasslessNouns);

        nounMix = nameNouns(nounMix.old);
		//console.log(nounMix);
        FnameNouns = utterances.getUtterances(nounMix.nuvo);

        return {
            definite: FdefiniteNouns,
            indefinite: FindefiniteNouns,
            classless: FclasslessNouns,
            name: FnameNouns,
            left: nounMix.old,
            takeAll: FdefiniteNouns.concat(FindefiniteNouns, FclasslessNouns, FnameNouns)
        };

    }

    return {

        definiteNouns: definiteNouns,
        indefiniteNouns: indefiniteNouns,
        classlessNouns: classlessNouns,
        nameNouns: nameNouns,
        getNouns: getNouns
    }

})();
