

var HelperFunctions = (function () {

    function filterWordsContainingText(array1, searchArray) {
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
        //console.log(newArray[0],newArray);
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

    function filterWordsContainingTextWithInterval(array, searchArray, startIndex, endIndex) {
        var newArray = [];
        var tempArr = JSON.parse(JSON.stringify(array));
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < searchArray.length; j++) {
                var index = tempArr[i].indexOf(searchArray[j], startIndex);
                //console.log(tempArr[i], searchArray[j],index)
                if (index > -1 && index <= endIndex) {
                    newArray.push(tempArr[i]);
                    tempArr.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
		//console.log(newArray);
        return {
            nuvo: newArray,

            old: tempArr
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
        newArr = []
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

    function replaceAllOccurrences(arr, itemToReplace, newItem) {
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'string') {
                while (arr[i].includes(itemToReplace)) {
                    arr[i] = arr[i].replace(itemToReplace, newItem);
                }
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

        copyString: copyString,

        arrReplaceAll: arrReplaceAll,
        separateIndexes: separateIndexes

    }

})();
