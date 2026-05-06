
//get al the adjectives and go colur them later

var lookForAdjectives = (function () {

    function getAdjectives(words) {
        var raw = HelperFunctions
            .filterWordsContainingTextWithInterval
            (words, ["'ɥ"], 0, 4);
			
		var themSubjectAdjcts = subjectAdj(raw.nuvo);
		var themRootAdjcts = adjectiveRoots(raw.nuvo);
		
        return {
            adjectives: utterances.getUtterances(themSubjectAdjcts.concat(themRootAdjcts)),
            left: raw.old
        };

    }
	
	function subjectAdj(arrTosearch){
		//go get the pronums
		//get the 'h ones
		//mutate the 'h into 'ɥ
		//take verbage and filter for subject pronum
		//you now only take pronuon adjectives

		var themAdjs = lookForPronouns.allAdjs();
		
        var subjctAdjs = HelperFunctions.flattenArrayByAttribute(themAdjs, 'name');
		
		subjctAdjs = HelperFunctions.replaceAllOccurrences(subjctAdjs,"'h","'ɥ");
		subjctAdjs = HelperFunctions
            .filterWordsContainingTextWithInterval
            (subjctAdjs, ["'ɥ"], 0, 4);

		var realSubjectAdjs = HelperFunctions
            .filterWordsContainingTextWithInterval(
			arrTosearch, 
			subjctAdjs.nuvo, 
			0, 1);
			
		//console.log(realSubjectAdjs, HelperFunctions.addStringToArrayItems(arrTosearch," "));
		return realSubjectAdjs.nuvo;
	}
	
	function adjectiveRoots(arrTosearch){
		//go into the pronumList and collect all the words that begin with a 'ɥ
		//you now only taking root adjectives
		var adjectRts = HelperFunctions
            .filterWordsContainingTextWithInterval
            (arrTosearch, ["'ɥ"], 0, 0);
		//console.log(adjectRts);	
		return adjectRts.nuvo;
		
	}

    return {
        getAdjectives: getAdjectives

    }

})();
