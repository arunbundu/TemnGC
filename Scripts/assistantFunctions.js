

var HelperFunctions = (function () {

    function filterWordsContainingText(array1, searchArray) {
		//expects an array not a string
		//console.log(array1);
		//arr1 is bigspoon
        var newArray = [];
        var tempArr = JSON.parse(JSON.stringify(array1));
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < searchArray.length; j++) {
                if (tempArr[i].includes(searchArray[j])) {
                    newArray.push(tempArr[i]);
                    tempArr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        //console.log( newArray, tempArr);
        return {
            nuvo: newArray,

            old: tempArr
        };
    }

    function filterWordsContainingTextByIndex(array, searchArray, index) {

        var newArray = [];
        var tempArr = JSON.parse(JSON.stringify(array));
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < searchArray.length; j++) {
				
                if (tempArr[i].indexOf(searchArray[j], index) === index) {
					//console.log(tempArr[i],searchArray[j]);
                    newArray.push(tempArr[i]);
					
                    tempArr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return {
            nuvo: newArray,

            old: tempArr
        };
    }

    function filterWordsContainingTextByIndexAndLength(array, searchArray, index, len) {

        var newArray = [];
        var tempArr = JSON.parse(JSON.stringify(array));
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < searchArray.length; j++) {
                if (tempArr[i].indexOf(searchArray[j], index) === index && tempArr[i].length >= len) {
                    newArray.push(tempArr[i]);
                    tempArr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return {
            nuvo: newArray,

            old: tempArr
        };
    }

    function filterWordsContainingTextByIndex_WithIgnore
    (array, searchArray, index, ignoreString) {
        var newArray = [];
        var tempArr = JSON.parse(JSON.stringify(array));
        for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i].includes(ignoreString)) {
                continue; // Skip elements containing the ignoreString
            }
            for (var j = 0; j < searchArray.length; j++) {
                //console.log(array[i],searchArray[j] );
                if (tempArr[i].indexOf(searchArray[j], index) === index) {

                    newArray.push(tempArr[i]);
                    tempArr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return {
            nuvo: newArray,
            old: tempArr
        };
    }

    function filterWordsContainingTextWithInterval(littleSpoon, bigSpoon, startIndex, endIndex) {
        var newArray = [];
		//console.log("lil",littleSpoon, littleSpoon.length, "biggie", bigSpoon);
        var tempArr = JSON.parse(JSON.stringify(littleSpoon));
		
        for (var j = 0; j < bigSpoon.length; j++) {

            for (var i = 0; i < tempArr.length; i++) {
				
				var index = tempArr[i].indexOf(bigSpoon[j], startIndex);
				
                if (index > -1 && index <= endIndex) {
					//console.log(tempArr[i], bigSpoon[j],index,"jIndex", j);
                    newArray.push(tempArr[i]);
                    tempArr.splice(i, 1);
                    i--;
                   
                }
            }
        }
		//console.log(newArray);
        return {
            nuvo: newArray,

            old: tempArr
        };
    }
	
	
	function filterWordsContainingTextByPropBigSpoon(array1, searchArray, prop) {
    // array1: array of objects
    // searchArray: array of strings to search for
    // prop: object property name that contains the text

    var newArray = [];
    var tempArr = JSON.parse(JSON.stringify(array1));

    for (var i = 0; i < tempArr.length; i++) {
        var value = tempArr[i][prop];

        if (typeof value !== "string") continue;

        for (var j = 0; j < searchArray.length; j++) {
            if (value.includes(searchArray[j])) {
                newArray.push(tempArr[i]);
                tempArr.splice(i, 1);
                i--;
                break;
            }
        }
    }

    return {
        nuvo: newArray,
        old: tempArr
    };
}

function filterWordsContainingTextByPropSmallSpoon(array1, searchArray, prop) {
    // array1: array of strings (big spoon)
    // searchArray: array of objects (small spoon)
    // prop: property on small spoon objects to search with

    var newArray = [];
    var tempArr = JSON.parse(JSON.stringify(searchArray)); // copy SMALL spoon

    for (var j = 0; j < tempArr.length; j++) {
        var needle = tempArr[j] && tempArr[j][prop];
        if (typeof needle !== "string") continue;

        for (var i = 0; i < array1.length; i++) {
            var text = array1[i];
            if (typeof text !== "string") continue;

            if (text.includes(needle)) {
                newArray.push(tempArr[j]); // pass OUT small spoon item
                tempArr.splice(j, 1);      // remove from small spoon
                j--;
                break;
            }
        }
    }

    return {
        nuvo: newArray, // matched SMALL spoon objects
        old: tempArr    // unmatched SMALL spoon objects
    };
}


    function removeCharacters(text, unwantedCharacters) {
        for (var i = 0; i < unwantedCharacters.length; i++) {
            var regex = new RegExp("\\" + unwantedCharacters[i], "g");
            text = text.replace(regex, "");
        }
        return text;
    }

    function removeUnapprovedCharacters(text, approvedCharacters) {
        var newText = "";
        for (var i = 0; i < text.length; i++) {
            if (approvedCharacters.includes(text[i])) {
                newText += text[i];
            }
        }

        return newText;
    }
	
		function removeDoubleSpacesFromArrayElements(arr) {
		if (!Array.isArray(arr)) return arr;

		var cleaned = [];

		for (var i = 0; i < arr.length; i++) {
			var str = arr[i];

			if (typeof str !== "string") {
				cleaned.push(str);
				continue;
			}

			while (str.indexOf("  ") !== -1) {
				str = str.replace("  ", " ");
			}

			cleaned.push(str);
		}

		return cleaned;
	}

    function createSubsectionArrayForObjects(inputArray, key, value) {
        var newArr = [];
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i][key].indexOf(value) > -1) {
                newArr.push(inputArray[i]);
            }
        }

        return newArr;
    }

    function creatArrayFromObjectProperty(arr, property) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {

            newArr.push(arr[i][property]);

        }

        return newArr;
    }

    function splitStringWithDelimiter(str, delimiter) {
        var result = [];
        var startIndex = 0;
        var delimiterIndex;
        var str8 = copyString(str);
		//console.log(str);
        while ((delimiterIndex = str8.indexOf(delimiter, startIndex)) != -1) {

            result.push(str8.slice(startIndex, delimiterIndex));

            startIndex = delimiterIndex + delimiter.length;
        }
        result.push(str8.slice(startIndex));
        //console.log(str8);
        //console.log(result[0]);
        return result;
    }

    function flattenArrayByAttribute(objects, attribute) {
        return objects.map(obj => obj[attribute]).flat();
    }

    // Function to copy a string using a for loop
    //JavaScript's implementation of ECMAScript can vary from browser to browser, however for Chrome, many string operations (substr, slice, regex, etc.) simply retain references to the original string rather than making copies of the string.
    function copyString(originalString) {
        // Check if the input is a string
		//console.log(originalString);
        if (typeof originalString !== 'string') {
            console.error('Input is not a string.');
            return null;
        }

        // Initialize an empty string to store the copy
        let copiedString = '';

        // Iterate through each character in the original string
        for (let i = 0; i < originalString.length; i++) {
            // Append each character to the copiedString
            copiedString += originalString[i];
        }

        // Return the copied string
        return copiedString;
    }

    function perfectIntersect(haystack, arr) {
        /**
         * @description determine if an array contains one or more items from another array.
         * @param {array} haystack the array to search.
         * @param {array} arr the array providing items to check for in the haystack.
         * @return {boolean} true|false if haystack contains at least one item from arr.
         */
		 console.log(haystack,arr);
        return arr.some(function (v) {
            return haystack.indexOf(v) >= 0;
        });

    };

    function findCommonAndDifferentElements(array1, array2) {
        // Create new arrays to store the common elements and the different elements
        let commonArray = [];
        let differentArray = [];
        let array1B = JSON.parse(JSON.stringify(array1));
        let array2B = JSON.parse(JSON.stringify(array2));

        // Loop through the first array
        for (let i = 0; i < array1B.length; i++) {
            // Check if the current element is present in the second array
            if (array2B.indexOf(array1B[i]) !== -1) {
                // If the element is found in both arrays, add it to the commonArray
                commonArray.push(array1B[i]);
            } else {
                // If the element is not found in the second array, add it to the differentArray
                differentArray.push(array1B[i]);
            }
        }

        // Return an object containing the common elements array and the different elements array
        return {
            common: commonArray,
            different: differentArray
        };
    }

    function addStringToArrayItems(arr, str) {
        // Check if the input is valid
        if (!Array.isArray(arr)) {
            throw new Error('The first argument must be an array');
        }

        if (typeof str !== 'string') {
            throw new Error('The second argument must be a string');
        }

        // Map over each item in the array and add the string
        const resultArray = arr.map(item => {
            if (typeof item === 'string') {
                return item + str;
            } else {
                return item;
            }
        });

        return resultArray;
    }
	
	 function addStringToArrayItemsLeft(arr, str) {
        // Check if the input is valid
        if (!Array.isArray(arr)) {
            throw new Error('The first argument must be an array');
        }

        if (typeof str !== 'string') {
            throw new Error('The second argument must be a string');
        }

        // Map over each item in the array and add the string
        const resultArray = arr.map(item => {
            if (typeof item === 'string') {
                return str + item;
            } else {
                return item;
            }
        });

        return resultArray;
    }

    function checkArrayItemsToTheLeft(string1, string2, array) {
        // Find the index of string2
        const indexString2 = string1.indexOf(string2);

        // If string2 is not found in string1, return false
        if (indexString2 === -1) {
            return false;
        }

        // Iterate through the array to check if any item's index is less than the index of string2
        for (let i = 0; i < array.length; i++) {
            // Find the index of the current array item in string1
            const indexItem = string1.indexOf(array[i]);

            // Check if the index of the current item is less than the index of string2
            if (indexItem !== -1 && indexItem < indexString2) {
                return true; // Return true if at least one item is found to the left of string2
            }
        }

        // If no item is found to the left of string2, return false
        return false;
    }

    function checkArrayItemsToTheRight(string1, string2, array) {
        // Find the index of string2
        const indexString2 = string1.indexOf(string2);

        // If string2 is not found in string1, return false
        if (indexString2 === -1) {
            return false;
        }

        // Iterate through the array to check if any item's index is greater than the index of string2
        for (let i = 0; i < array.length; i++) {
            // Find the index of the current array item in string1
            const indexItem = string1.indexOf(array[i]);

            // Check if the index of the current item is greater than the index of string2
            if (indexItem !== -1 && indexItem > indexString2) {
                return true; // Return true if at least one item is found to the right of string2
            }
        }

        // If no item is found to the right of string2, return false
        return false;
    }
	
	function countSubstring(haystack, needle) {
		//expects a single string for both
    if (typeof haystack !== "string" || typeof needle !== "string") return 0;
    if (needle === "") return 0;

    var count = 0;
    var index = 0;

    while (true) {
        index = haystack.indexOf(needle, index);
        if (index === -1) break;

        count++;
        index += needle.length; // move past this match
    }

    return count;
}

   function replaceAllOccurrences(arr, itemToReplace, newItem) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "string") {
            arr[i] = arr[i].split(itemToReplace).join(newItem);
        }
    }
    return arr;
}

    function exists(obj) {

        if (typeof obj === "undefined") {

            return false;

        }
        return true;
    }

    function splitArrayInHalf(arr) {
        const midpoint = Math.floor(arr.length / 2);
        const firstHalf = arr.slice(0, midpoint);
        const secondHalf = arr.slice(midpoint);
        return {
            firstHalf: firstHalf,
            secondHalf: secondHalf
        };
    }

    function arrReplaceAll(array, oldItem, newItem) {
        // Check if the input is an array
        if (!Array.isArray(array)) {
            console.error('Input is not an array.');
            return null;
        }

        // Use a for loop to iterate through each element in the array
        for (let i = 0; i < array.length; i++) {
            // Check if the current element is equal to the oldItem
            if (array[i] === oldItem) {
                // If so, replace it with the newItem
                array[i] = newItem;
            }
        }

        // Return the modified array
        return array;
    }
	
	function trimWordsAtMarkers(wordArray, markers) {
    return wordArray.map(word => {
        for (let marker of markers) {
            if (word.includes(marker)) {
                return word.substring(0, word.indexOf(marker));
            }
        }
        return word;
    });
}

    function separateIndexes(arr, charactersToCheck) {
        const containsCharacter = [];
        const doesNotContainCharacter = [];
        const containsMultipleInstances = [];

        arr.forEach((element) => {
            const charCounts = charactersToCheck.map((char) => (element.match(new RegExp(char, 'g')) || []).length);
            const totalCharCount = charCounts.reduce((acc, count) => acc + count, 0);

            if (totalCharCount > 1) {
                containsMultipleInstances.push(element);
            } else {
                let containsAtLeastOne = false;
                charactersToCheck.forEach((char, charIndex) => {
                    if (charCounts[charIndex] > 0) {
                        containsAtLeastOne = true;
                        return;
                    }
                });

                if (containsAtLeastOne) {
                    containsCharacter.push(element);
                } else {
                    doesNotContainCharacter.push(element);
                }
            }
        });

        return {
            containsCharacter,
            doesNotContainCharacter,
            containsMultipleInstances,
        };
    }

    return {

        filterWordsContainingText: filterWordsContainingText,

        filterWordsContainingTextByIndex: filterWordsContainingTextByIndex,

        removeCharacters: removeCharacters,

        removeUnapprovedCharacters: removeUnapprovedCharacters,

        createSubsectionArrayForObjects: createSubsectionArrayForObjects,

        creatArrayFromObjectProperty: creatArrayFromObjectProperty,

        filterWordsContainingTextByIndex_WithIgnore:
        filterWordsContainingTextByIndex_WithIgnore,

        filterWordsContainingTextWithInterval:
        filterWordsContainingTextWithInterval,

        filterWordsContainingTextByIndexAndLength:
        filterWordsContainingTextByIndexAndLength,

        splitStringWithDelimiter: splitStringWithDelimiter,

        flattenArrayByAttribute: flattenArrayByAttribute,

        perfectIntersect: perfectIntersect,

        findCommonAndDifferentElements: findCommonAndDifferentElements,

        addStringToArrayItems: addStringToArrayItems,

        checkArrayItemsToTheLeft: checkArrayItemsToTheLeft,

        checkArrayItemsToTheRight: checkArrayItemsToTheRight,

        replaceAllOccurrences: replaceAllOccurrences,

        exists: exists,

        splitArrayInHalf: splitArrayInHalf,
		
		trimWordsAtMarkers: trimWordsAtMarkers,

        copyString: copyString,

        arrReplaceAll: arrReplaceAll,
        separateIndexes: separateIndexes,
		removeDoubleSpacesFromArrayElements : removeDoubleSpacesFromArrayElements,
		countSubstring: countSubstring,
		addStringToArrayItemsLeft : addStringToArrayItemsLeft,
		filterWordsContainingTextByPropSmallSpoon : filterWordsContainingTextByPropSmallSpoon,
		filterWordsContainingTextByPropBigSpoon : filterWordsContainingTextByPropBigSpoon

    }

})();
