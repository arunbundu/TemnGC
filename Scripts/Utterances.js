


var utterances = (function () {

    var allTemneLetters = ["a", "m", "n", "s", "e",
        "r", "ŋ", "ɪ", "i", "j",
        "θ", "t", "o", "b", "d",
        "ɱ", "u", "l", "β", "f",
        "ɔ", "k", "w", "x", "ɛ", "z",
        "c", "g", "ʌ", "y", "p", "ʂ",
        "ə", "ħ", "ʒ", "v", "h",
        "-", "q", "\u0301",
        "\u0300", "\u0305", "\u0020", "\u0304",
        "'", "ɥ"];

    var oldColour = "";

    let overHover = function () {
        // aprantly who ever class the function gets to be called "this"
        if (this.className =="highlight") {
            oldColour = this.style.backgroundColor;
            //console.log(oldColour);
            this.style.backgroundColor = 'red';
			
        } else if (this.classList.contains("highlighted")) {
            oldColour = this.style.backgroundColor;
            //console.log(oldColour);
            this.style.backgroundColor = '#bac7db';
        }

    };

    let overNoMore = function () {
        this.style.backgroundColor = oldColour;
    }

    function getTemneLetters() {
        return allTemneLetters;
    }


    function getUtterances(words) {
        //expects a string array
        var tempUtter = [];
        var tmpStr = [];
        var results = [];
        var p = 1;
		
        for (var i = 0; i < words.length; i++) {
            //collect the word and break it
            tempStr = words[i].split("-");
            tempUtter.push(WordSplitter.wordCleaner(words[i])); // save the word signature

            for (var q = 0; q < tempStr.length; q++) {

                if (q > 0 && tempStr[q].indexOf('q') >= 0) {
                    //ensure that down the road -q'a are taken care of
                    continue;

                }

                tempUtter.push(tempStr[q]); //collect the pieces of the word
            }

            results.push(tempUtter);
            tempUtter = [];
            tmpStr = [];
        }

        //morhpemize the word
        //console.log(results);
        var results2 = JSON.parse(JSON.stringify(results));
        results2 = morphemes.getMorphemes(results2);
		//console.log(results2[0]);
        return results2;
    }

    function displayUtterances(div) {

        var displayText = div.innerText.substr(0, 5000);
        displayText = displayText.split("");
        displayText = HelperFunctions.replaceAllOccurrences(displayText, "\n", '<br/> ');

        displayText = displayText.join("");
        var utters = displayText.split(" ");
        var highlightedText = "";

        for (var i = 0; i < utters.length; i++) {
            highlightedText += '<span class="highlight">' + utters[i] + ' </span>';
        }

        div.innerHTML = highlightedText;
    }

    function activateDeadUtterances() {

        var highlightElements = document.querySelectorAll('.highlight');
        var oldColour = "";

        highlightElements.forEach(function (element) {
            element.addEventListener('mouseover', overHover);

            element.addEventListener('mouseout', overNoMore);
        });

    }

    function crack(utterances) {
        //console.log(utterances);
        var newArr = [];
        var temp = {};
        //expects utterances
        for (var i = 0; i < utterances.length; i++) {

            for (var q = 1; q < utterances[i].length; q++) {

                temp = {
                    sign: utterances[i][0],
                    root: utterances[i][q].root[0],
                    affixes: utterances[i][q].affixes,
                    order: utterances[i][q].order,
                    speechClass: utterances[i][q].speechClass
                }
                newArr.push(JSON.parse(JSON.stringify(temp)));

            }

        }
		//console.log(temp);
        return newArr;
    }

    function crackWholes(utterances) {
        var newArr = [];
        //expects utterances
		//console.log(utterances);
        for (var i = 0; i < utterances.length; i++) {

            newArr.push(utterances[i][0]);
        }
        return newArr;
    }


	
	function colourCode(section, utterances, sClass = ".highlight") {
    if (typeof section === "undefined") return;
	
    const spanElements = document.querySelectorAll("span" + sClass);

    // Preprocess utterances into a Map for fast lookups
    const utteranceMap = new Map();
    for (let i = 0; i < utterances.length; i++) {
        let cleanUtterance = WordSplitter.wordCleaner(utterances[i]).replace(/\s/g, "");
		//console.log(cleanUtterance );
        utteranceMap.set(cleanUtterance, i);
    }
	

    spanElements.forEach(span => {
        let cleanSpan = WordSplitter.wordCleaner(span.innerText).replace(/\s/g, "");
		
        if (utteranceMap.has(cleanSpan)) {
            let i = utteranceMap.get(cleanSpan);
			
			span.classList.remove("notindict-highlight");
            // Optional: use classList to apply a class instead of inline styles
            switch (section) {
                case "Noun":
                    span.classList.add("noun-highlight");
                    span.id = "noun" + i;
                    break;
                case "Verb":
                    span.classList.add("verb-highlight");
                    span.id = "verb" + i;
                    break;
                case "Adjective":
                    span.classList.add("adjective-highlight");
                    span.id = "adjective" + i;
                    break;
                case "Pronoun":
                    span.classList.add("pronoun-highlight");
                    span.id = "pronoun" + i;
                    break;
                case "Conjunction":
                    span.classList.add("conjunction-highlight");
                    span.id = "conjunction" + i;
                    break;
                case "Lone Letter":
                    span.classList.add("loneletter-highlight");
                    span.id = "loneLetter" + i;
                    break;
                case "Lone Affixes":
                    span.classList.add("loneaffix-highlight");
                    span.id = "loneAffix" + i;
                    break;
                case "NotInDict":
                    span.classList.add("notindict-highlight");
                    break;
            }

            span.classList.add("highlighted");// override base class
        }
    });
}


    return {
        getUtterances: getUtterances,
        getTemneLetters: getTemneLetters,
        displayUtterances: displayUtterances,
        activateDeadUtterances: activateDeadUtterances,
        crack: crack,
        crackWholes: crackWholes,
        colourCode: colourCode

    }

})();


/**
Here are the **main steps** carried out by the `utterances` module:

---

### 🔠 1. **Store All Temne Letters**

* Lists all characters valid in Temne (including special characters, combining accents, and spaces).

---

### 🧠 2. **Handle Mouse Hover Events**

* Defines what happens when the mouse hovers **over** or **out of** a highlighted word:

  * Temporarily changes background color to help with interactivity.

---

### 🗣️ 3. **Break Words into Utterances**

* `getUtterances(words)`:

  * Takes an array of words.
  * Splits compound words using hyphens (`-`).
  * Ignores some cases involving the letter "q".
  * Calls a **morpheme processor** to analyze word structure (roots, affixes, etc.).
  * Returns morpheme-analyzed structures.

---

### 🖼️ 4. **Display Highlighted Words in a Div**

* `displayUtterances(div)`:

  * Gets the first 5000 characters from a `div`.
  * Splits the text into words.
  * Wraps each word in a `<span class="highlight">...</span>` for styling and interaction.
  * Inserts this back into the `div`.

---

### 🖱️ 5. **Activate Mouse Interactivity**

* `activateDeadUtterances()`:

  * Attaches mouseover and mouseout events to all `.highlight` spans to trigger color effects.

---

### 🧩 6. **Extract Morpheme Info**

* `crack(utterances)`:

  * For each utterance (a broken-down word):

    * Extracts:

      * `sign`: original word signature
      * `root`: root of the word
      * `affixes`: any prefixes/suffixes
      * `order`: affix order
      * `speechClass`: grammatical class
    * Returns a flat array of these items.

---

### 🧱 7. **Extract Original Word Forms**

* `crackWholes(utterances)`:

  * Returns just the original "sign" or whole form of each analyzed word.

---

### 🎨 8. **Apply Color Codes by Word Type**

* `colourCode(section, utterances, sClass)`:

  * Matches each span in the DOM to words in a provided list.
  * Applies a color and ID based on the grammatical type:

    * **Noun**: light green
    * **Verb**: light purple
    * **Adjective**: dark orange
    * **Pronoun**: bright green
    * **Conjunction**: blue
    * **Lone Letter**: teal
    * **Lone Affix**: violet
    * **NotInDict**: yellow
  * Changes `className` from `highlight` to `highlighted`.

---

Let me know if you want this turned into a flow diagram or paired with the other part you sent earlier.

**/