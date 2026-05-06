

/**
 * Compute neighbor-based comfort for word spans.
 take in the raw text from the DOM, 
 split it my morphemes
 turn each morpheme into a span
 calculate the comfort
 colour the morphemes
 * @param {NodeList | Array} spans - Array of <span> elements representing words in order
 * @param {Object} sociabilityMap - { word: { neighborWord: score, ... } } 
 * @param {number} windowSize - Number of previous neighbors to consider
 */

var sociabilityScore = (function (){
	

function splitTextToWords(rawText) {
    // Example using your WordSplitter
    var words = splitToRoots.custom_split(rawText);

    return words; // should return an array of strings
}


function createSpansFromWords(words, container) {
    container.innerHTML = ""; // clear container first
    const spans = words.map(word => {
        const span = document.createElement("span");
        span.innerText = word+" ";
		span.classList.add("highlight");
        container.appendChild(span);
        return span;
    });
	
	utterances.activateDeadUtterances();
	
    return spans;
}


function assignNeighborComfort(spans, suciabilityMap = sociabilityMap , windowSize = 5) {
    const spanArray = Array.from(spans);
    spanArray.forEach((span, index) => {
        const start = Math.max(0, index - windowSize);
        const neighbors = spanArray.slice(start, index); // previous words only

        const neighborScores = neighbors.map(n => {
            const neighborWord = n.innerText.trim();
            const currentWord = span.innerText.trim();
			
            if (suciabilityMap[currentWord] && suciabilityMap[currentWord][neighborWord] !== undefined) {
				//console.log("Yes paring",currentWord,neighborWord);
                return suciabilityMap[currentWord][neighborWord];
				
            } else if (suciabilityMap[currentWord]){
				console.log("No paring",currentWord,neighborWord);
                return 0.7; // fallback neutral score
            }else {
				
                return 0.2; // fallback neutral score
            }
        });

        const avgComfort = neighborScores.length > 0
            ? neighborScores.reduce((a, b) => a + b, 0) / neighborScores.length
            : 0.5;

        span.dataset.neighborComfort = avgComfort;
    });

    console.log(`✅ Neighbor comfort computed for ${spanArray.length} words`);
    return spanArray;
}

function runAll(container){
	
	assignNeighborComfort(createSpansFromWords(splitTextToWords(container.innerText), container));
	
}

	
	return {

        assignNeighborComfort: assignNeighborComfort,
		splitTextToWords: splitTextToWords,
		assignNeighborComfort: assignNeighborComfort,
		runAll: runAll
		

    }
	
})();







