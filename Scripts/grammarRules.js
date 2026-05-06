

function goGetCartegory(windowText, carte, patternSoFar, windowPosition){
		// given a window and a word to build with
		//look at the current word you are making is is a cartegory?
		//if yes go grab that word in the rest of the workingwindow
		//make sure the word matches the carte
		//send that word along
//console.log("inputting:",carte);
		var workingWindow = windowText.split(" ");

		var startIndex = patternSoFar.trim().length === 0
			? 0
			: patternSoFar.trim().split(" ").length;

		if(patternSoFar.trim() == "0"){
			workingWindow = workingWindow.slice(0).join(" ");
		}else if(patternSoFar.indexOf("0") == 0){
			workingWindow = workingWindow.slice(startIndex-1).join(" ");
		}else{
			workingWindow = workingWindow.slice(startIndex).join(" ");
		}
		var tmp1;
		var tmp2;

//console.log("soFar:",patternSoFar, "patternLength:", startIndex, "vindow:", workingWindow, "WINDOW:",windowText);	


		if(carte.indexOf("BEGINHERE") == 0){
			
			tmp1 = beginHereLogic(windowText, carte, patternSoFar, windowPosition, workingWindow);
			
			return tmp1;
			
		}



		switch (carte.trim()) {
        case "NOUN":
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
                tmp1[0], utterances.getTemneLetters());

			if( tmp2.length > 2 && lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0){ return tmp1[0]; }
            break;
        case "definiteNOUN":
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
                tmp1[0], utterances.getTemneLetters());

			if( tmp2.length > 2 && 
			(lookForNouns.getNouns( [tmp1[0]] ).definite.length > 0 || 
			HelperFunctions.filterWordsContainingText(lookForNouns.getNouns( [tmp1[0]] ).classless, ["h'ə́h"]) .nuvo.length > 0)){ 
			return tmp1[0]; }
            break;
		case "məNOUN":
           //look into the next word
			//see if their is a class noun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");
			if( lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 &&
				tmp1[0].indexOf(".") != tmp1[0].length-1 &&  tmp1[0].indexOf(")") != tmp1[0].length-1 &&
				(tmp1[0].indexOf("mə́'") == 0  || tmp1[0].indexOf("m̀ʌ'") == 0)){return tmp1[0];}

            break;
		case "rəNOUN":
           //look into the next word
			//see if their is a rə́'- noun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");
			if( lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				(tmp1[0].indexOf("rə́'") == 0  || tmp1[0].indexOf("r̀ʌ'") == 0)){return tmp1[0];}

            break;
		case "təNOUN":
           //look into the next word
			//see if their is a correct noun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");
			if( lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				(tmp1[0].indexOf("tə́'") == 0  || tmp1[0].indexOf("t̀ʌ'") == 0)){return tmp1[0];}

            break;
		case "kəNOUN":
           //look into the next word
			//see if their is a correct noun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");
			if( lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				(tmp1[0].indexOf("kə́'") == 0  || tmp1[0].indexOf("k̀ʌ'") == 0)){return tmp1[0];}

            break;
		case "nameNOUN":
           //look into the next word
			//see if their is a name noun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");

			if( lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				tmp1[0].length > 2 &&
				tmp1[0].indexOf("\u0300") == 1  && 
				tmp1[0].indexOf("'") < 0){return tmp1[0];}

            break;
        case "!ŋaciNOUN":
	
			tmp1= workingWindow.split(" ");

			if(lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				
				!tmp1[0].startsWith("ə́ŋ'")  && 
				!tmp1[0].startsWith("ə̀'") &&
				!tmp1[0].startsWith("áŋ'")  && 
				!tmp1[0].startsWith("à'")   
				){return tmp1[0]}
           
            break;
        case "ŋaciNOUN":
	
			tmp1= workingWindow.split(" ");

			if(lookForNouns.getNouns( [tmp1[0]] ).takeAll.length > 0 && 
				(
				tmp1[0].startsWith("ə́ŋ'")  ||
				tmp1[0].startsWith("ə̀'") ||
				tmp1[0].startsWith("áŋ'")  || 
				tmp1[0].startsWith("à'")     )
				){return tmp1[0]}
           
            break;
        case "VERB":
  
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
            tmp1[0], utterances.getTemneLetters());

			if( tmp2.length > 2 && lookForVerbs.getVerbs( [tmp1[0]] ).takeAll.length > 0){ return tmp1[0]; }          
            break;
        case "toBeVERB":
  
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
            tmp1[0], utterances.getTemneLetters());
//console.log(tmp1,tmp1[0].indexOf("'yi") >= 0);
			if( tmp2.length > 2 && lookForVerbs.getVerbs( [tmp1[0]] ).takeAll.length > 0 && 
			tmp1[0].indexOf("'yi") >= 0){ return tmp1[0]; }          
            break;	
        case "toDoVERB":
  
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
            tmp1[0], utterances.getTemneLetters());

			if( tmp2.length > 2 && lookForVerbs.getVerbs( [tmp1[0]] ).takeAll.length > 0 && 
			tmp1[0].indexOf("'yɔ") >= 0){ return tmp1[0]; }          
            break;	
        case "toLookVERB":
  
            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
            tmp1[0], utterances.getTemneLetters());
			
			if( tmp2.length > 2 && lookForVerbs.getVerbs( [tmp1[0]] ).takeAll.length > 0 && 
			(tmp1[0].indexOf("kʌli") >= 0  || tmp1[0].indexOf("nʌɪk") >= 0 )){ return tmp1[0]; }          
            break;			
        case "ADJECTIVE":

            tmp1= workingWindow.split(" ");
			tmp2 = HelperFunctions.removeUnapprovedCharacters(
                tmp1[0], utterances.getTemneLetters());

			if( tmp2.length > 2 && lookForAdjectives.getAdjectives( [tmp1[0]] ).adjectives.length > 0){ return tmp1[0]; }
            
            break;
        case "PRONOUN":


          
            break;
		case "subjectPRONOUN":
            //look into the next word
			//see if their is a subject pronoun structure
			//if yes then send the word along and make it part of the pattern
			tmp1= workingWindow.split(" ");
//console.log(tmp1);
			if( tmp1[0].indexOf("'") > -1 && tmp1[0].indexOf("'") <= 2 &&
					(tmp1[0].indexOf("\u0300") < 0 || tmp1[0].indexOf("\u0300") > tmp1[0].indexOf("'")) && 
					(tmp1[0].indexOf("\u0301") < 0 || tmp1[0].indexOf("\u0301") > tmp1[0].indexOf("'"))){return tmp1[0]}
            break;
	    case "!subjectPRONOUN":
			tmp1= workingWindow.split(" ");

			if( !(tmp1[0].indexOf("'") > -1 && tmp1[0].indexOf("'") <= 2 &&
					tmp1[0].indexOf("\u0300") < 0 && tmp1[0].indexOf("\u0301") < 0)){return tmp1[0]}else {return carte;}           
            break;
		case "subjectProgressivePRONOUN":
            //look into the next word
			//see if their is a subject progressive pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mɔŋ' type pronoun at the begining

			tmp1= workingWindow.split(" ");
			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("subjectProgressive");
			
			//console.log(tmp1);
			if( HelperFunctions.filterWordsContainingText([tmp1[0]], tmp2).nuvo.length > 0 ){ return tmp1[0];}
            break;
		case "objectPRONOUN":
            //look into the next word
			//see if their is a object pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1= workingWindow.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("objectLone");
			tmp2 = HelperFunctions.addStringToArrayItems(tmp2," ");
	
			if( HelperFunctions.filterWordsContainingText([tmp1[0]+" "], tmp2).nuvo.length > 0 &&
					tmp1[0].indexOf("\u0300") < 0 && 
					tmp1[0].indexOf("\u0301") < 0 && 
					tmp1[0].indexOf("'") < 0){return tmp1[0];}
            break;
		case "descriptionalPRONOUN":
            //look into the next word
			//see if their is a object pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1= workingWindow.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("descriptional");
			tmp2 = HelperFunctions.addStringToArrayItems(tmp2," ");
	//console.log(tmp2);
			if( HelperFunctions.filterWordsContainingText([tmp1[0]+" "], tmp2).nuvo.length > 0 &&
					tmp1[0].indexOf("\u0300") < 0 && 
					tmp1[0].indexOf("\u0301") < 0 && 
					tmp1[0].indexOf("'") < 0){return tmp1[0];}
            break;
		case "!objectPRONOUN":
            //look into the next word
			//see if their is a object pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1= workingWindow.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("object");
	
			if( !(HelperFunctions.filterWordsContainingText([tmp1[0]], tmp2).nuvo.length > 0 &&
					tmp1[0].indexOf("\u0300") < 0 && 
					tmp1[0].indexOf("\u0301") < 0 && 
					tmp1[0].indexOf("'") < 0)){return tmp1[0]}else {return carte;}
            break;
	
		case "objectAccusationalPRONOUN":
            //look into the next word
			//see if their is a correct pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1= workingWindow.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("objectAccusational");
	//console.log(tmp2);
			if( HelperFunctions.filterWordsContainingText([tmp1[0]], tmp2).nuvo.length > 0 ){return tmp1[0];}
            break;
		case "directAssertativeObjectivePRONOUN":
            //look into the next word
			//see if their is a object pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1 = HelperFunctions.removeUnapprovedCharacters(
								workingWindow, utterances.getTemneLetters());
			tmp1= tmp1.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("directAssertative/objective");
			tmp2 = HelperFunctions.addStringToArrayItems(tmp2," ");

			if( tmp1[0].indexOf("h") !=tmp1[0].length-1 && 
				HelperFunctions.filterWordsContainingText([tmp1[0]+" "], tmp2).nuvo.length > 0 ){return tmp1[0];}
            break;
		case "objectivalPronounPosessivesPRONOUN":
            //look into the next word
			//see if their is a object pronoun structure
			//if yes then send the word along and make it part of the pattern
			//this is for seeing if the window has a mu type pronoun at the begining
			tmp1 = HelperFunctions.removeUnapprovedCharacters(
								workingWindow, utterances.getTemneLetters());
			tmp1= tmp1.split(" ");

			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("objectivalPronounPosessives");
			tmp2 = HelperFunctions.addStringToArrayItemsLeft(tmp2," ");

			if( tmp1[0].indexOf("h") != tmp1[0].length-1 && 
				HelperFunctions.filterWordsContainingText([" "+tmp1[0]], tmp2).nuvo.length > 0 ){return tmp1[0];}
            break;
        case "CONJUNCTION":
           
            break;
        case "!yɛhCONJUNCTION":
				tmp1= workingWindow.split(" ");

				if(tmp1[0].trim() == "yɛh"){

					return carte;
				}else { return tmp1[0];}
            break;
        case "QUESTIONATIVE":
	
			tmp1= workingWindow.split(" ");
			if( lookForConjunctions.questionatives.includes(tmp1[0]) ){return tmp1[0];}
           
            break;
        case "!QUESTIONATIVEand!thisPRONOUN":
	
			tmp1= workingWindow.split(" ");
			tmp2 = lookForPronouns.getPronounsArrayByDescribeType("discriptional/subject")

			if( !lookForConjunctions.questionatives.includes(tmp1[0]) && 

				!tmp2.includes(tmp1[0])){return tmp1[0]}
           
            break;
        case "!QUESTIONATIVE":
	
			tmp1= workingWindow.split(" ");
			//console.log(tmp1[0]);
			if( !lookForConjunctions.questionatives.includes(tmp1[0].replace("?",""))){return tmp1[0]}
           
            break;
        case "LONELETTER":
           
            break;
        case "ignoreLONELETTER":
			tmp1= workingWindow.split(" ");

			if( loneLetter([tmp1[0]]).lttrs.length > 0 ){return tmp1[0];}else {return"";}   
            break;

        case "LONEAFFIX":
		
			tmp1= workingWindow.split(" ");
			
			if(loneAffix.getLoneAffixes([tmp1[0]]).length>0){
				//console.log(tmp1);
				return tmp1[0];}
			
            break;
        case "ignoreLONEAFFIX":
			tmp1= workingWindow.split(" ");
		
			if( loneAffix.getAffixes([tmp1[0]]).affixes.length  > 0 ){return tmp1[0];}else {return"";}      
            break;
        case "ignoreCOMMA":
			tmp1= workingWindow.split(" ");
		
			if( tmp1[0] == "," ){return tmp1[0];}else {return"";}              
            break;
	    case "!COMMA":
		
			if( patternSoFar.trim().endsWith(",")){return carte;}else {return"";}           
            break;
	    case "ENDPUNCTUATION":
				tmp1= workingWindow.split(" ");
				
			if( patternSoFar.trim().endsWith(".") ||
				patternSoFar.trim().endsWith(")")){return "";}       
            break;
	    case "!ENDPUNCTUATION":

			if( patternSoFar.trim().endsWith(".") ||
				patternSoFar.trim().endsWith(")")){return carte;}else {return"";}           
            break;
	   
		case "!oINDEXNorehINDEXNorQUESTIONATIVE":
				tmp1= workingWindow.split(" ");

				if( tmp1.indexOf("ò") >= 0  || tmp1.indexOf("ɛ̀") >= 0 ||
					HelperFunctions.filterWordsContainingText(tmp1, lookForConjunctions.questionatives).nuvo.length > 0 ){
					
					return carte;
					}else{ return tmp1[0];}
				break;	
		case "WITHpo":
				tmp1= workingWindow.split(" ");

				if( patternSoFar.indexOf("'po") >= 0  ){return tmp1[0];}
				break;	
		case "təhINDEX":
				tmp1= workingWindow.split(" ");

				if( patternSoFar.trim().indexOf(".") != patternSoFar.trim().length-1 &&
					patternSoFar.trim().indexOf(",") != patternSoFar.trim().length-1 &&
					tmp1.indexOf("təh") >= 0  ){return tmp1[0];}
				break;	
		case "longTimeINDEX":
				tmp1= workingWindow.split(" ");

				if( tmp1[0].indexOf("woni") >= 0  ){return tmp1[0];}
				break;	
		case "!withTahINDEX":
				tmp1= workingWindow.split(" ");

				if( patternSoFar.indexOf("tah") >= 0  ){}else{return tmp1[0];}
				break;	
		case "kʌpahINDEX":
				tmp1= workingWindow;

				if(patternSoFar.indexOf("kʌpah") >= 0 ){
					
					return tmp1[0];;
					}
				break;	
		case "!stopINDEX":
				tmp1= workingWindow;

				if((tmp1.indexOf(".") >= 0  && tmp1.indexOf(".") <= 2) || patternSoFar.trim().indexOf(".") == patternSoFar.trim().length-1){
					
					return carte;
					}else{ 
						tmp1= workingWindow.split(" ");

						return tmp1[0];}
				break;
	    case "!BREAKING":
		
			if( patternSoFar.trim().endsWith(",") || patternSoFar.trim().endsWith(".")){return carte;}else {return"";}           
            break;				
		case "!aeINDEX":
				tmp1= workingWindow;

				if(tmp1.indexOf("è,") >= 0 ){
					
					return carte;
					}else{ 
						tmp1= workingWindow.split(" ");

						return tmp1[0];}
				break;	
		case "norQUESTIONATIVE":
				tmp1= workingWindow.split(" ");

				if( HelperFunctions.filterWordsContainingText([tmp1[0]], lookForConjunctions.questionatives).nuvo.length > 0 || 
					HelperFunctions.filterWordsContainingText([patternSoFar], lookForConjunctions.questionatives).nuvo.length > 0){
					
					return carte;
					}else{ return tmp1[0];}
				break;	
		case "ohSAMETEST":
				tmp1= workingWindow.split(" ");
				tmp2 = patternSoFar.trim().split(" ");
				
				if(tmp2.length == 2 && tmp2[0] == tmp1[0]){
					
					return tmp1[0];
				}else if( tmp2.length < 2){ return tmp1[0];}
				break;
		case "IGNORE":
				tmp1= workingWindow.split(" ");
				if(tmp1.length > 1){
					return tmp1[0];
				}else{
					return "";
				}
				
				break;	
		case "SPACE":
				return carte;
				
				break;
		default:

			return carte;
			break;

	}

	//console.log("returning:",carte);
	return carte;
}




function beginHereLogic(vvindowText, vvcarte, vvpatternSoFar, vvindowPosition, vvorkingWindow){
	
		var tmp1= vvorkingWindow.split(" ");
		var tmp2 = vvcarte.split(",");
		console.log("met here?!?", vvindowPosition, vvorkingWindow.indexOf(tmp2[1]));
		
		if(vvindowPosition == 0 && vvorkingWindow.indexOf(tmp2[1]) == 0 ){
			//check if you are in the begining of a paragraph
			//check if the begining of the window is the words after BEGINHERE
			// return a 0 so that way if 0 is the first letter in the pattern is is removed later on
			//else it is kept
			
			return "0"+ tmp2[1];
		}else if(vvindowText.indexOf(".") == 0 && vvorkingWindow.indexOf(tmp2[1]) == 0){
			return ".";
		}else if(vvindowText.indexOf(".") == 0 && tmp2[1] == "0"){
			return "";
		}else{ return vvcarte}

}































