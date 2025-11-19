export const typeMapping = [
	"",
	"group",
	"therapist",
	"surveyor",
	"endocrinologist",
	"surgeon",
	"logopedics",
	"hairremoval",
	"urologist",
	"gynecologist",
	"GP",
	"pharmacy"
];

export const attributeMapping = {
	group: [
		"trans",
		"regularMeetings",
		"consulting",
		"activities",
		"remote"
	],
	hairremoval: [
		"insurancePay",
		"transfriendly",
		"hasDoctor"
	],
	surveyor: [
		"enby",
		"remote"
	],
	surgeon: [
		"selfPayedOnly",
		"remote"
	],
	endocrinologist: [
		"treatsNB",
		"remote"
	],
	therapist: [
		"selfPayedOnly",
		"treatsNB",
		"youthOnly",
		"remote"
	],
	logopedics: [
		"remote"
	],
	urologist: [
		"treatsNB",
		"transFem",
		"transMasc",
		"remote"
	],
	gynecologist: [
		"treatsNB",
		"transFem",
		"transMasc",
		"remote"
	],
	GP: [
		"treatsNB",
		"remote"
	],
	pharmacy: [
		"shipping",
		"singleUseVials",
		"reuseVial",
		"prefilled"
	],
} as const;

export const attributeDetails = {
	hairremoval: [
		"insurancePay",
		"transfriendly",
		"hasDoctor"
	],
	endocrinologist: [
		"treatsNB",
		"remote"
	],
	surveyor: [
		"enby",
		"remote"
	],
	surgeon: [
		"selfPayedOnly",
		"remote"
	],
	therapist: [
		"selfPayedOnly",
		"treatsNB",
		"youthOnly",
		"remote"
	],
	logopedics: [
		"remote"
	],
	urologist: [
		"treatsNB",
		"transFem",
		"transMasc",
		"remote"
	],
	gynecologist: [
		"treatsNB",
		"transFem",
		"transMasc",
		"remote"
	],
	GP: [
		"treatsNB",
		"remote"
	],
	pharmacy: [
		"shipping",
		"singleUseVials",
		"reuseVial",
		"prefilled"
	]
} as const;

export const offerMapping = {
	therapist: [
		"indication",
		"therapy"
	],
	surgeon: [
		"mastectomy",
		"vaginPI",
		"vaginCombined",
		"ffs",
		"penoid",
		"breast",
		"hyst",
		"orch",
		"clitPI",
		"bodyfem",
		"glottoplasty",
		"fms"
	],
	hairremoval: [
		"laser",
		"ipl",
		"electro",
		"electroAE"
	],
	urologist: [
		"hrt",
		"medication"
	],
	gynecologist: [
		"hrt",
		"medication"
	],
	GP: [
		"hrt",
		"medication"
	],
	pharmacy: [
		"eInjection",
		"cpa"
	],
} as const;

export const subjectMapping = {
	therapist: [
		"therapist",
		"psychologist",
		"naturopath",
		"other"
	]
};

export const accessibleMapping = [
	"unknown",
	"yes",
	"no"
];

export const academicTitleMapping = [
	"dr",
	"prof",
	"prof_dr"
]

export function makeTranslatedMapping(mapping: string[] = [], translation: Record<string, string>) {
	let m = {};
	
	for (const key of mapping) {
		m[key] = translation[key];
	}

	return m;
}