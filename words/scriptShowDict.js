
let randomizedOrder = false;

// Define the custom letter order
const customLetterOrder = ['a', 'm', 'n', 's',
    'e', 'r', 'ŋ', 'ɪ',
    'i', 'j', 'θ', 't',
    'o', 'b', 'd', 'ɱ',
    'u', 'l', 'β', 'f',
    'ɔ', 'k', 'w', 'x',
    'ɛ', 'z', 'c', 'g',
    'ʌ', 'y', 'p', 'ʂ',
    'ə', 'ɸ', 'ʒ', 'v'];

document.addEventListener('DOMContentLoaded', function () {
    displayWords(dictionary);
    updateWordCount(dictionary.length);
});

function updateWordCount(count) {
    const wordCountElement = document.getElementById('wordCount');
    wordCountElement.innerHTML = `ə́ŋ'mɔlɔ 'hŋa t́'θɛlma: <br/> ${count}`;
}

function displayWords(words) {
    // Get the reference to the <ul> element with the id 'wordList'
    const wordList = document.getElementById('wordList');

    // Clear the existing content inside the <ul> element
    wordList.innerHTML = '';

    // Sort words using the custom letter order
    const sortedWords = words.sort((a, b) => {
        // Extract and convert the words to lowercase for case-insensitive sorting
        const wordA = a["koh 'yi ɛ́'sikra à?"].toLowerCase().replace("'h", "")
            .replace("h'", "").replace("ɸ", "").replace("h́", "ɸ").replace("h", "").replace("*'", "");
        
		const wordB = b["koh 'yi ɛ́'sikra à?"].toLowerCase().replace("'h", "")
            .replace("h'", "").replace("ɸ", "").replace("h́", "ɸ").replace("h", "").replace("*'", "");

        // Compare each character in the words based on the custom letter order
        for (let i = 0; i < Math.min(wordA.length, wordB.length); i++) {
            const indexA = customLetterOrder.indexOf(wordA[i]);
            const indexB = customLetterOrder.indexOf(wordB[i]);

            // If characters are in different positions in the custom order, return the comparison result
            if (indexA != indexB) {
                return indexA - indexB;
            }
        }

        // If the words have the same beginning but different lengths, return the comparison based on length
        return wordA.length - wordB.length;
    });

    // Create a new array for display order, either randomized or sorted
    const displayOrder = randomizedOrder ? shuffleArray(sortedWords.slice()) : sortedWords.slice();

    // Iterate over the sorted or randomized words and create <li> elements to display them
    displayOrder.forEach((entry, index) => {
        // Create a new <li> element
        const li = document.createElement('li');
        const orderNumber = decimalToBase20(index+1) + " ";

        // Set the inner HTML of the <li> element, displaying the word and its meaning
        li.innerHTML = `<strong>${orderNumber}${entry["koh 'yi ɛ́'sikra à?"].replace("*'h","'h")}:</strong> ${entry["koh k̀ʌ'yiɪkliʂ ḱ'θɛlma kʌ'yema-fɔf à?"]}`;

        // Add a click event listener to the <li> element to open the overlay on click
        li.addEventListener('click', function () {
            openOverlay(entry,index);
        });

        // Append the <li> element to the <ul> element
        wordList.appendChild(li);
    });
}

function filterWords() {
    const filterInput = document.getElementById('filterInput');
    const filterText = filterInput.value.toLowerCase();
    const filterType = document.getElementById('filterType').value;

    const filteredWords = dictionary.filter(entry => {
        if (filterType === "ḱ'θɛlma") {
            return entry["koh 'yi ɛ́'sikra à?"].toLowerCase().includes(filterText);
        } else if (filterType === "kə́'ceɱp") {
            return entry["koh k̀ʌ'yiɪkliʂ ḱ'θɛlma kʌ'yema-fɔf à?"].toLowerCase().includes(filterText);
        }
    });

    displayWords(filteredWords);
	updateWordCount(filteredWords.length);
}

function toggleOrder() {
    randomizedOrder = !randomizedOrder;
    displayWords(dictionary);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

