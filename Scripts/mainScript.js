
var inputTextBox = document.getElementById('inputTextBox');

var grabTextInputBtn = document.getElementById('grabTextInputBtn');

var openClass;

var closedClass;

var temp = [];

var temp2 = [];

const sheetID ="1dOW95IsCLO830gr8tvGBcHGQlUXdyP9CMvIavPykImI";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/`;

grabTextInputBtn.addEventListener("click", function () {

    utterances.displayUtterances(inputTextBox);

    utterances.activateDeadUtterances();

    //fetch the text and do some light cleaning
    var mixedRaw = WordSplitter.wordCleaner(inputTextBox.innerText);

    var mixed = WordSplitter.splitWords(mixedRaw);

    //get rid of words with multiple instances of apostrophe
    var openClass = HelperFunctions.separateIndexes(mixed.abrir, ["'"]);
	//recover the people names
	openClass = openClass.containsCharacter.concat(openClass.doesNotContainCharacter);

    closedClass = mixed.cerrado;

    //word classes
    var Nouns = lookForNouns.getNouns(openClass);
    utterances.colourCode("Noun", utterances.crackWholes(Nouns.takeAll));

    var Verbs = lookForVerbs.getVerbs(Nouns.left);
    utterances.colourCode("Verb", utterances.crackWholes(Verbs.takeAll));

    var Adjectives = lookForAdjectives.getAdjectives(Verbs.left);
    utterances.colourCode("Adjective", utterances.crackWholes(Adjectives.adjectives));

    var Pronouns = lookForPronouns.getPronouns(closedClass);
    utterances.colourCode("Pronoun", Pronouns.pronum);

    var Conjunctions = lookForConjunctions.getConjunctions(Pronouns.left);
    utterances.colourCode("Conjunction", Conjunctions.conjuns);

    var LoneLetter = loneLetter(Conjunctions.left);
    utterances.colourCode("Lone Letter", LoneLetter.lttrs);

    var LoneAffix = loneAffix.getAffixes(LoneLetter.left);
    utterances.colourCode("Lone Affixes", LoneAffix.affixes);

    console.log(Nouns, Verbs, Adjectives, Pronouns, Conjunctions, LoneLetter, LoneAffix);
	
    goFetch.getDictionaryWords(url, Nouns.takeAll);
    goFetch.getDictionaryWords(url, Verbs.takeAll);
    goFetch.getDictionaryWords(url, Adjectives.adjectives);
    loneAffix.fixLoneAffixes(LoneAffix.affixes);

});



/**

Here are the **steps** performed by the code:

1. **Get HTML Elements**

   * Locate the text box where users input text.
   * Locate the button that will trigger the text processing.

2. **Set Up Variables**

   * Prepare variables to hold "open class" and "closed class" words.
   * Prepare temporary arrays (purpose unclear here).
   * Define the URL of a Google Sheet to use as a dictionary source.

3. **Set Up Button Click Handler**

   * When the user clicks the button, start processing the input text.

4. **Display Input Words Visually**

   * Show all the input text as individual word elements in the interface.

5. **Highlight Unknown or Unprocessed Words**

   * Mark words that aren't yet identified or classified.

6. **Clean the Input Text**

   * Remove unwanted characters and normalize spacing or punctuation.

7. **Split Cleaned Text Into Words**

   * Break the text into manageable word units.

8. **Filter Open Class Words**

   * Exclude open class words that contain multiple apostrophes.
   * Restore or retain person names.

9. **Assign Closed Class Words**

   * Collect closed class words (likely includes function words like prepositions, pronouns, etc.).

10. **Identify and Mark Nouns**

    * Detect nouns from the open class words.
    * Color-code the nouns in the visual display.

11. **Identify and Mark Verbs**

    * Detect verbs from the remaining words.
    * Color-code the verbs.

12. **Identify and Mark Adjectives**

    * Detect adjectives from the remaining words.
    * Color-code the adjectives.

13. **Identify and Mark Pronouns**

    * Detect pronouns from the closed class words.
    * Color-code the pronouns.

14. **Identify and Mark Conjunctions**

    * Detect conjunctions from the remaining closed class words.
    * Color-code the conjunctions.

15. **Identify and Mark Lone Letters**

    * Detect any isolated letters from what’s left.
    * Color-code them.

16. **Identify and Mark Lone Affixes**

    * Detect prefixes or suffixes that appear alone.
    * Color-code them.

17. **Log Classification Results to Console**

    * Output all classifications for debugging or review.

18. **Fetch Dictionary Meanings from Google Sheets**

    * For nouns, verbs, and adjectives, retrieve definitions or matches from a dictionary sheet.

19. **Process and Attach Lone Affixes**

    * Try to interpret or merge lone affixes with known roots or patterns.

Let me know if you want this as a flowchart or want to generate a visual summary.



**/
