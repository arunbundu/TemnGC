
var mohyiGroup =[
	"məNOUN + mɔh + subjectPRONOUN",
	"mɔh + mɔh + subjectPRONOUN",
	"rekeh + mɔh + subjectPRONOUN",
	"toh + mɔh + subjectPRONOUN",
	"orNOUN + mɔh + subjectPRONOUN",
	"'ba + NOUN + + subjectPRONOUN",
	"QUESTIONATIVE + hsɔ́ + mɔh + subjectPRONOUN",
	"ɔwah + məNOUN + mɔh + subjectPRONOUN",
	"kəh + mɔh + subjectPRONOUN",
	"koh + mɔh + subjectPRONOUN",
	"koh + minɛ + mɔh + subjectPRONOUN",
	"koh + minɛŋ + mɔh + subjectPRONOUN",
	"'hkə + mɔh + subjectPRONOUN",
	"yəh + mɔh + subjectPRONOUN",
	"əte + mɔh + subjectPRONOUN",
	"əte hsɔ́ + mɔh + subjectPRONOUN",
	"longTimeINDEX + mɔh + subjectPRONOUN",
	"longTimeINDEX + IGNORE + mɔh + subjectPRONOUN",
	"longTimeINDEX + IGNORE + IGNORE + mɔh + subjectPRONOUN",
	"koh + mɔh + subjectPRONOUN + !aeINDEX",
	"koh + VERB + mɔh + subjectPRONOUN + !aeINDEX",
	"objectivalPronounPosessivesPRONOUN + mɔh + subjectPRONOUN"
	
]

var mongmohGroup =[
	"BEGINHERE,0 + subjectProgressivePRONOUN + !oINDEXNorehINDEXNorQUESTIONATIVE",
	"!QUESTIONATIVEand!thisPRONOUN + hsɔ́ + subjectProgressivePRONOUN",
	"kəbih + subjectProgressivePRONOUN",
	"əte + definiteNOUN + subjectProgressivePRONOUN",
	"koh + definiteNOUN + subjectProgressivePRONOUN",
	"mɔh + definiteNOUN + subjectProgressivePRONOUN",
	"dó'- + definiteNOUN + subjectProgressivePRONOUN",
	"ró'- + definiteNOUN + subjectProgressivePRONOUN",
	"dó' + definiteNOUN + subjectProgressivePRONOUN",
	"ró' + definiteNOUN + subjectProgressivePRONOUN",
	"toLookVERB + subjectProgressivePRONOUN",
	"toLookVERB + IGNORE + subjectProgressivePRONOUN",
	"toLookVERB + objectPRONOUN + IGNORE + subjectProgressivePRONOUN",
	"toLookVERB + objectPRONOUN + LONEAFFIX + LONEAFFIX + subjectProgressivePRONOUN",
	"alih + subjectProgressivePRONOUN",
	"h'mɔyɛŋ + subjectProgressivePRONOUN",
	"kɛrɛh + subjectProgressivePRONOUN",
	"subjectProgressivePRONOUN + mɔ̄h",
	"mɔ̄h + subjectProgressivePRONOUN",
	"ɔwah + subjectProgressivePRONOUN",
	", + subjectProgressivePRONOUN + !QUESTIONATIVE + !stopINDEX + !oINDEXNorQUESTIONATIVE",
	", + subjectProgressivePRONOUN + !oINDEXNorQUESTIONATIVE + !stopINDEX",
	", + subjectProgressivePRONOUN + !stopINDEX + !oINDEXNorQUESTIONATIVE",
	"... + subjectProgressivePRONOUN + !oINDEXNorQUESTIONATIVE",
	") + subjectProgressivePRONOUN + !oINDEXNorQUESTIONATIVE",
	"subjectProgressivePRONOUN + təhINDEX"
	
]

var konohGroup = [
		"'hkə + objectPRONOUN + directAssertativeObjectivePRONOUN",
		"hə́ŋ + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"nanɛ+ directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"directAssertativeObjectivePRONOUN + hβó + VERB",
		"kʌpahINDEX + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"NOUN + ADJECTIVE + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"NOUN + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"ADJECTIVE + VERB + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"infinitivalPosessivesPRONOUN + NOUN + directAssertativeObjectivePRONOUN",
		"NOUN + ADJECTIVE + directAssertativeObjectivePRONOUN + ENDPUNCTUATION",
		"!yɛhCONJUNCTION + directAssertativeObjectivePRONOUN + definiteNOUN + ENDPUNCTUATION",
		"directAssertativeObjectivePRONOUN + subjectPRONOUN + ENDPUNCTUATION",
		"directAssertativeObjectivePRONOUN + subjectPRONOUN + ,"
			];
			
var konoonghGroup = [
		"objectAccusationalPRONOUN + !ENDPUNCTUATION + subjectPRONOUN + è"
			];
			
var ofOursGroup = [
	". + objectivalPronounPosessivesPRONOUN + !subjectPRONOUN",
	"objectivalPronounPosessivesPRONOUN + ḱ'",
	"objectivalPronounPosessivesPRONOUN + mɔh + p'",
	"objectivalPronounPosessivesPRONOUN + toBeVERB",
	"objectivalPronounPosessivesPRONOUN + toDoVERB",
	"NULLobjectivalPronounPosessivesPRONOUN + definiteNOUN"

]
	
var thisThemGroup = [

"descriptionalPRONOUN + mʌ'"

];
	
var triggerWords = [
		{ 
	triggerStr: "aŋe",
	enemyStr:thisThemGroup
	},{ 
	triggerStr: "ma'-",
	enemyStr:["BEGINHERE,ma'"].concat(mongmohGroup)
	},{ 
	triggerStr: "mɔh",
	enemyStr:[
	"mamuh + p'yi + mɔh",
	"məNOUN + mɔh + objectPRONOUN",
	"'bələnɛ + mɔh",
	"ɔwah + məNOUN + mɔh + subjectPRONOUN",
	"ɔwah + ignoreLONELETTER + ignoreCOMMA + məNOUN + ignoreLONELETTER + ignoreCOMMA + mɔh + subjectPRONOUN",
	"ɔwah + p'yi + mɔh",
	"kɛrɛh + p'yi + mɔh",
	"kɛrɛh + hrə́s + p'yi + mɔh",
	"koh + mɔh + '",
	"è + p'yi + mɔh",
	"BEGINHERE,p'yi + mɔh",
	", + p'yi",
	"!withTahINDEX + mɔh + pepih"
	
	]

	},{ 
	triggerStr: "munɔŋ",
	enemyStr:konohGroup
	},{ 
	triggerStr: "munɔ̄ŋ",
	enemyStr:konoonghGroup
	},{ 
	triggerStr: "minɛŋ",
	enemyStr:konohGroup
	},{ 
	triggerStr: "minɛ̄ŋ",
	enemyStr:konoonghGroup
	},{ 
	triggerStr: "mɔ̄h",
	enemyStr:[
	"CONJUNCTION + mɔ̄h"
	]
	},{	
	triggerStr: "mɔh i'-",
	enemyStr:mohyiGroup
	},{ 
	triggerStr: "mɔh ɪ'-",
	enemyStr: mohyiGroup
	},{	
	triggerStr: "mɔh a'-",
	enemyStr:mohyiGroup
	},{ 
	triggerStr: "mɔh aŋ'-",
	enemyStr: mohyiGroup
	},{ 
	triggerStr: "mɔh ɔ'-",
	enemyStr: mohyiGroup
	},{ 
	triggerStr: "mɔŋ'-",
	enemyStr:mongmohGroup
	},{ 
	triggerStr: "maŋ'-",
	enemyStr:mongmohGroup
	},{ 
	triggerStr: "mɔ'-",
	enemyStr:mongmohGroup
	},{ 
	triggerStr: "mɛ'-",
	enemyStr:mongmohGroup
	},{ 
	triggerStr: "'hmə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "'hrə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "'hŋə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "ŋaci",
	enemyStr:[
	"!ŋaciNOUN + ŋaci"
	]
	},{ 
	triggerStr: "ŋa ci",
	enemyStr:[
	"ŋaciNOUN + ŋa + ci"
	]
	},{ 
	triggerStr: "'hdə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "θā́h",
	enemyStr:[]
	},{ 
	triggerStr: "'htə",
	enemyStr:["tah + 'htə"].concat(ofOursGroup)
	},{ 
	triggerStr: "təh",
	enemyStr:[
	"BEGINHERE,tə́' + təh",
	"BEGINHERE,t̀ʌ' + təh",
	"təNOUN + !COMMA + təh",
	"təNOUN + !COMMA + kəh + subjectPRONOUN + !objectPRONOUN",
	"təh + objectPRONOUN"
	]
	},{ 
	triggerStr: "'htʌ",
	enemyStr:["tah + 'htʌ"]
	},{ 
	triggerStr: "'hdə",
	enemyStr:["rəNOUN + 'hdə + objectPRONOUN"].concat(ofOursGroup)
	},{ 
	triggerStr: "ɔ̀",
	enemyStr:[
	"ohSAMETEST + ɔ̀ + ohSAMETEST"
	]
	},{ 
	triggerStr: "ɔwe",
	enemyStr:thisThemGroup
	},{ 
	triggerStr: "'hkə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "kɔnɔŋ",
	enemyStr:konohGroup
	},{ 
	triggerStr: "kɔnɔ̄ŋ",
	enemyStr:konoonghGroup
	},{ 
	triggerStr: "kəh",
	enemyStr:[
	"BEGINHERE,kə́' + kəh",
	"BEGINHERE,k̀ʌ' + kəh",
	"kəNOUN + !BREAKING + kəh",
	"kəNOUN + !BREAKING + kəh + subjectPRONOUN + !objectPRONOUN",
	"kəh + objectPRONOUN",
	"kəh + '"
	]
	},{ 
	triggerStr: "'hyə",
	enemyStr:ofOursGroup
	},{ 
	triggerStr: "'hpə",
	enemyStr:ofOursGroup
	}
];