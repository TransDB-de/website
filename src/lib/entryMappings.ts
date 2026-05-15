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
	"pharmacy",
	"cryo"
];

export const attributeMapping: Record<string, string[]> = {
	group: ["trans", "regularMeetings", "consulting", "activities", "remote"],
	hairremoval: ["insurancePay", "transfriendly", "hasDoctor"],
	surveyor: ["enby", "remote"],
	surgeon: ["selfPayedOnly", "remote"],
	endocrinologist: ["treatsNB", "remote"],
	therapist: ["selfPayedOnly", "treatsNB", "youthOnly", "remote"],
	logopedics: ["remote"],
	urologist: ["treatsNB", "transFem", "transMasc", "remote"],
	gynecologist: ["treatsNB", "transFem", "transMasc", "remote"],
	GP: ["treatsNB", "remote"],
	pharmacy: ["shipping", "singleUseVials", "reuseVial", "prefilled"],
	cryo: [
		// "selfPayedOnly", // I assume each category should only have one
		"insurancePay"
	]
};

export const offerMapping: Record<string, string[]> = {
	therapist: ["indication", "therapy"],
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
	hairremoval: ["laser", "ipl", "electro", "electroAE"],
	urologist: ["hrt", "medication"],
	gynecologist: ["hrt", "medication"],
	GP: ["hrt", "medication"],
	pharmacy: ["eInjection", "cpa"],
	cryo: [
		"freezesSperm", // could also use treatsFem/Masc
		"freezesEggs" // but I think it helps to be explicit about what they do
	]
};

export const subjectMapping: Record<string, string[]> = {
	therapist: ["therapist", "psychologist", "naturopath", "other"]
};

export const accessibleMapping = ["unknown", "yes", "no"];

export const academicTitleMapping = ["dr", "prof", "prof_dr"];

export function makeTranslatedMapping(mapping: string[] = [], translation: Record<string, string>) {
	let m: Record<string, string> = {};

	for (const key of mapping) {
		m[key] = translation[key];
	}

	return m;
}
