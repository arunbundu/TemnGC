
const singular = "mə́'βal";
const plural = "mə́'βal pepih p'θas 'hŋin";
const affClassi = "ḱ'baɱpahnɛ́ yih kʌ'hlolok";
const place = "ə́ŋ'βəp"

var goFetch = (function () {

    async function checkURLsForString(urls) {
        var results = [];
        //url2 = 'https://jsonplaceholder.typicode.com/todos/1';
        var temp1;
        var temp2;

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            try {
                const response = await fetch(url).then(res => res.text()).then(json => {
                    results.push((JSON.parse(json.substr(47).slice(0, -2))).table);
                    //console.log(results);
                });
                /**
                var response2 = await fetch('https://example.com/api/v1/users', {
                headers: {
                Authorization: 'Bearer <token>',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'

                }
                }).then(rez => rez.json()).then(rez => {
                console.log(rez)
                });
                 **/

            } catch (error) {
                results.push(error.message);
            }
        }

        return results;
    }

    async function getOnline(words, url) {
        var url1 = "";
        var url2 = "";
        var results = [];
		var internetToggle=document.getElementById('chequeBox');
		var useInternet=internetToggle.checked;
		var areWeOnline =navigator.onLine;
        words.filter(n => n); //clean out all empty indexes
		console.log();
        for (var i = 0; i < words.length; i++) {
            

            if ( !areWeOnline || !useInternet) { 
			//say we are off line I wnat to use the lacal dictionary

                            temp1 = dictionary.filter(a => a[singular].indexOf(words[i]) > -1);
                            temp2 = dictionary.filter(a => a[plural].indexOf(words[i]) > -1);

                            results.push([{
                                        "rows": temp1
                                    }
                                ], [{
                                        "rows": temp2
                                    }
                                ]);
                            //console.log(results, words);

            } else {

                //console.log(words[i]);
                url1 = url + 'tq?sheet=Roots&tq=SELECT%20*%20where%20A%20contains%20%22' + words[i] + '%22';
                url2 = url + 'tq?sheet=Roots&tq=SELECT%20*%20where%20E%20contains%20%22' + words[i] + '%22';

                try {
                    await checkURLsForString([url1, url2]).then(res => {

                        results.push(res);
                    });

                } catch (error) {
                    results.push(error.message);
                }

            }

        }

        return results;

    }

    function crackJsonForRoots(words) {
        // expects the results from getOnline
        var newArr = [];
        //console.log(words);
        for (var i = 0; i < words.length; i++) {

            for (var q = 0; q < words[i].length; q++) {

                if (words[i][q].rows && words[i][q].rows.length > 0) {

                    for (var c = 0; c < words[i][q].rows.length; c++) {

                        if (words[i][q].rows[c].c && words[i][q].rows[c].c.length > 0) {
                            //standard google sheets words
                            if (words[i][q].rows[c].c[0].v &&
                                words[i][q].rows[c].c[0].v.length > 0) {

                                newArr = newArr.concat(words[i][q].rows[c].c[0].v.split(";"));

                            } else {
                                continue;
                            }

                            if (words[i][q].rows[c].c[4] &&
                                words[i][q].rows[c].c[4].v.length > 0) {

                                newArr = newArr.concat(words[i][q].rows[c].c[4].v.split(";"));

                            } else {
                                continue;
                            }

                        } else {
                            //not so standard google words

                            newArr = newArr.concat(words[i][q].rows[c][singular].split(";"));
                            newArr = newArr.concat(words[i][q].rows[c][plural].split(";"));
                            //console.log(newArr);
                        }

                    }

                } else {
                    continue;
                }

            }

        }
		
        return newArr;

    }

    function crackJsonForAffix(words) {
        // expects the results from getOnline
        var words2 = JSON.parse(JSON.stringify(words));
        var newArr = [];
        var temp1;
        var temp2;

        for (var i = 0; i < words2.length; i++) {

            for (var q = 0; q < words2[i].length; q++) {
                if (words2[i][q].rows && words2[i][q].rows.length > 0) {

                    for (var c = 0; c < words2[i][q].rows.length; c++) {
						
						//ensure you are only looking at prefixes
                        if (words2[i][q].rows[c].c &&
                            words2[i][q].rows[c].c.length &&
							(words2[i][q].rows[c].c[3].v).indexOf('fiks') > 0) {
								
                            if (words2[i][q].rows[c].c[6] &&
                                words2[i][q].rows[c].c[6].v &&
                                words2[i][q].rows[c].c[6].v.length > 0) {
                                temp2 = words2[i][q].rows[c].c[6].v.split(";");

                            } else {
                                continue;
                            }

                            if (words2[i][q].rows[c].c[0].v &&
                                words2[i][q].rows[c].c[0].v.length > 0) {

                                temp1 = words2[i][q].rows[c].c[0].v.split(";");

                            } else {
                                continue;
                            }

                            newArr.push({
                                roots: temp1,
                                clasi: temp2
                            });

                        } else if (words2[i][q].rows[c][place] &&
						words2[i][q].rows[c][place]
						.indexOf('fiks') > 0){
                            //console.log(words2[i][q].rows[c]);

                            temp1 = words2[i][q].rows[c][singular].split(";");
                            temp2 = words2[i][q].rows[c][affClassi].split(";");

                            newArr.push({
                                roots: temp1,
                                clasi: temp2
                            });
                        }

                    }

                } else {
                    continue;
                }

            }

        }

        return newArr;

    }

    async function CheckDictionary(temp, url) {

        var temp2 = [];
		var tempTemp;
        await getOnline(temp, url).
        then(res => {

            temp2 = crackJsonForRoots(res);
            //console.log(res);
            temp2 = HelperFunctions.
                replaceAllOccurrences(temp2, ' ', "");
			temp2 = HelperFunctions.
			replaceAllOccurrences(temp2,"*'h","'h");

			if(temp2.some(str => str.includes("\u0304"))){
				//if macron overline is needed keep it
				//console.log(temp);
				temp2 = HelperFunctions.
                findCommonAndDifferentElements(temp, temp2);
				
			}else{
				//if macron overline is not needed remove it before you chack for word matches
				//console.log(temp);
				tempTemp=HelperFunctions.
                replaceAllOccurrences(temp,"\u0304", "");
				
				temp2 = HelperFunctions.
                findCommonAndDifferentElements(tempTemp, temp2);
				
			}

        });

        return temp2;

    }

    async function getDictionaryWordForRoot(cracked, url) {
        var newArr = [];
        //console.log(cracked);
        var cracked2 = JSON.parse(JSON.stringify(cracked));
        for (var a = 0; a < cracked.length; a++) {

            await CheckDictionary([cracked2[a].root, cracked2[a].root.replaceAll("\u0304", "")], url).
            then(res => {

                if (res.common.length > 0) {
                    cracked2[a]["use"] = "SAME";
                    newArr.push(cracked2[a]);
                } else {
                    cracked2[a]["use"] = "NEW";
                    newArr.push(cracked2[a]);

                }
            });
        }
        return newArr;

    }

    async function getDictionaryWordForAffix(cracked, url) {
        var newArr = [];
        var temp;
        var cracked2 = JSON.parse(JSON.stringify(cracked));

        for (var a = 0; a < cracked.length; a++) { //get the roots

            if (cracked[a].use == "SAME") {

                if (cracked[a].affixes.length == 0) {
                    //for words without Affixes
                    newArr.push(cracked2[a]);
                    continue;
                }
                cracked2[a].affixes = []; // clean out this section so you can fll with all the contenders
                for (var b = 0; b < cracked[a].affixes.length; b++) { //get the affixes
                    //and make sure that prefixes are splelled correctly

                    if (cracked[a].affixes[b].length < 2) {

                        //for words without Affixes
                        cracked2[a].affixes[b] = {
                            clasi: "",
                            roots: []
                        };
                        cracked2[a].affixes[b] = undefined;
                        newArr.push(cracked2[a]);
                        continue;
                    }
					//console.log(cracked[a].affixes[b].replace("'", "").replace("\u0304", ""));
                    await getOnline([cracked[a].affixes[b].replace("'", ""), 
					cracked[a].affixes[b].replace("'", "").replaceAll("\u0304", "")], url).
                    then(res => {

                        temp = crackJsonForAffix(res);

                        if (temp.length < 1) { // for affixes that do not exist, please reassign the word use
                            cracked2[a].use = "NEW";
                            newArr.push(cracked2[a]);
                        } else { // insert all the affixes that esixt

                            cracked2[a].affixes = cracked2[a].affixes.concat(temp);
                            newArr.push(cracked2[a]);

                        }

                    });

                }

            } else {
                newArr.push(cracked2[a]);
            }

        }

        return newArr;

    }

    function checkDictionaryWordForAffixes(dictUtter) {
        //console.log(dictUtter);
        var dictUtter2 = JSON.parse(JSON.stringify(dictUtter));

        for (var i = 0; i < dictUtter2.length; i++) {

            for (var p = 0; p < dictUtter2[i].affixes.length; p++) {
                //for all the specific use affixes check if they are being used properly
                if (dictUtter2[i].use == "SAME") {

                    if (typeof dictUtter2[i].affixes[p] === "undefined" || dictUtter2[i].affixes[p] == null) {

                        continue;

                    }
                    //console.log(dictUtter2[i]);
                    if (dictUtter2[i].affixes[p] &&
                        dictUtter2[i].affixes[p].clasi[0] == "a__k_r_h_k_k_h_hn_hy__k_lma_o__h_lma__hb") {
                        //for all the special use case affix check every sent affix to see if one of them is the one being used
                        if (HelperFunctions.
                            filterWordsContainingTextWithInterval(dictUtter2[i].affixes[p].roots,
                                [dictUtter2[i].root], 0, 6)
                            .nuvo.length > 0) {

                            dictUtter2[i] = {
                                sign: dictUtter2[i].sign,
                                root: dictUtter2[i].root,
                                affixes: dictUtter2[i].affixes,
                                use: "SAME",
                                order: dictUtter2[i].order,
                                speechClass: dictUtter2[i].speechClass
                            }
							 console.log(dictUtter2[i],p);

                        } else if (p == dictUtter2[i].affixes.length) {

                            dictUtter2[i] = {
                                sign: dictUtter2[i].sign,
                                root: dictUtter2[i].root,
                                affixes: dictUtter2[i].affixes,
                                use: "NEW",
                                order: dictUtter2[i].order,
                                speechClass: dictUtter2[i].speechClass
                            }
                            console.log(dictUtter2[i],p);
                        } else {

                            dictUtter2[i] = {
                                sign: dictUtter2[i].sign,
                                root: dictUtter2[i].root,
                                affixes: dictUtter2[i].affixes,
                                use: "SAME",
                                order: dictUtter2[i].order,
                                speechClass: dictUtter2[i].speechClass
                            }
                            //console.log(dictUtter2[i]);
                        }

                    } else if (dictUtter2[i].affixes[p] &&
                        dictUtter2[i].affixes[p].roots.length > 0) {

                        dictUtter2[i] = {
                            sign: dictUtter2[i].sign,
                            root: dictUtter2[i].root,
                            affixes: dictUtter2[i].affixes,
                            use: "SAME",
                            order: dictUtter2[i].order,
                            speechClass: dictUtter2[i].speechClass
                        }

                    } else {
                       //console.log(dictUtter2[i]);
                        dictUtter2[i] = {
                            sign: dictUtter2[i].sign,
                            root: dictUtter2[i].root,
                            affixes: dictUtter2[i].affixes,
                            use: "NEW",
                            order: dictUtter2[i].order,
                            speechClass: dictUtter2[i].speechClass
                        }

                    }

                }

            }
        }

        return dictUtter2;

    }

    function dictionaryColourCode(words) {
        //expect a dictUtter
		
        for (var i = 0; i < words.length; i++) {
			//console.log(words[i]);
            if (words[i].use == "NEW" && words[i].order == 0) {
				//console.log(words[i]);
                utterances.colourCode("NotInDict", [words[i].sign], ".highlighted");

            } else if (words[i].use == "SAME" && words[i].order >= 0) {
                //console.log(words[i]);
                utterances.colourCode(words[i].speechClass, [words[i].sign], ".highlighted");

            }

        }

    }

    async function getDictionaryWords(url, utters) {
		//console.log(utters);
        // expects Utters;
        var newArr = [];
        var utters2 = JSON.parse(JSON.stringify(utters));
        var cracked = utterances.crack(utters2);
        for (var q = 0; q < cracked.length; q++) {

            await getDictionaryWordForRoot([cracked[q]], url).then(res => {

                getDictionaryWordForAffix(res, url).then(res2 => {

                    newArr = checkDictionaryWordForAffixes(res2);
                    console.log(newArr[0]);
                    dictionaryColourCode(newArr);

                });
            });

        }

    }

    return {

        getOnline: getOnline,
        crackJsonForRoots: crackJsonForRoots,
        CheckDictionary: CheckDictionary,
        dictionaryColourCode: dictionaryColourCode,
        getDictionaryWords: getDictionaryWords

    }

})();
