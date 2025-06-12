


var lookForConjunctions = (function () {

    var conjunctions = [
        "dɛh", "yih", "yɛh", "θah", "kɛrɛh", "beh", "pepih", "katɔŋ",
        "mɔh", "mɔ̄h", "was", "mɔ̄dɔh", "kəbih", "tah",
        "kaɪkah", "ɔwah", "salatah", "kʌpah", "kəh", "kah",
        "kəməh", "cɛnih", "alih", "ɛntih", "yəh", "sap", "beθeh", "θas",
        "yiɪkah", "βeŋ", "hāŋ", "hāŋ", "θaβeh", "konih", "cɛɪcɛnɛh",
        "nʌsəh", "laɪsah", "θalɔm", "yɛŋ", "kākeh", "yəh"
    ];

    var greetings = ["ʂɛnɛh", "sɛkɛh", "panɛmoh", "piyarih", "mamuh", "θoɪθoh"];
    var responses = ["ādeh", "ɪkoh", "iyoh", "momoh", "marih", "nāyēh", "nāh", "āŋ", "yawoh","owoh"];
    var questionatives = ["koh", "toh", "nɛh", "mɔlɔh", "iyah", "kɛnɛh", "dekeh", "rekeh", "yoh"];
    var loneFunctionatives = ["yaθih", "θāh", "təh", "ŋah", "ɪgɛh", "kkr:", "tkr:", "kkr:", "mah", "θonɔh", "bioh", "mɔ̄dɔh", "ɪnaŋ", "iyāh", "wɔyaŋ"];

    conjunctions = conjunctions.concat(greetings, responses, questionatives, loneFunctionatives);

    function get(tex) {

        for (var i = 0; i < conjunctions.length; i++) {

            if (conjunctions[i].name == tex) {

                return conjunctions[i];
            }

        }

        return "n/a";

    }

    function allConjun() {

        return conjunctions;
    }

    function getConjunctions(words) {
        //console.log(words);
		
        var temp = HelperFunctions.
            findCommonAndDifferentElements(HelperFunctions.trimWordsAtMarkers(words, ["-q"]), allConjun());
 
        return {
            conjuns: temp.common,
            left: temp.different
        }
    }

    return {

        get: get,
        allConjun: allConjun,
        getConjunctions: getConjunctions
    }

})();
