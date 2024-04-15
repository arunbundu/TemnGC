
function loneLetter(words) {
    //console.log(words);
    var temneAccentedVowels = ["à", "è", "ì", "ò", "ù", "ɔ̀", "ɛ̀", "ʌ̀", "ə̀"];
	var temneAccentedVowels2 = ["ā̀", "ḕ", "ī̀", "ṑ", "ū̀", "ɔ̄̀", "ɛ̄̀", "ʌ̄̀", "ə̄̀"];
    var temp = HelperFunctions.
        findCommonAndDifferentElements(words, temneAccentedVowels.concat(temneAccentedVowels2));

    return {
        lttrs: temp.common,
        left: temp.different
    }
}
