
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
