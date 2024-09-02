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
	"GP"
];

export const attributeMapping = {
	group: ["trans", "regularMeetings", "consulting", "activities", "remote"],
	hairremoval: ["insurancePay", "transfriendly", "hasDoctor"],
	surveyor: ["enby", "remote"],
	surgeon: ["selfPayedOnly", "remote"],
	endocrinologist: ["treatsNB", "remote"],
	therapist: ["selfPayedOnly", "treatsNB", "youthOnly", "remote"],
	logopedics: ["remote"],
	urologist: ["treatsNB", "transFem", "transMasc", "remote"],
	gynecologist: ["treatsNB", "transFem", "transMasc", "remote"],
	GP: ["treatsNB", "remote"]
} as const;

export const attributeDetails = {
	hairremoval: ["insurancePay", "transfriendly", "hasDoctor"],
	endocrinologist: ["treatsNB", "remote"],
	surveyor: ["enby", "remote"],
	surgeon: ["selfPayedOnly", "remote"],
	therapist: ["selfPayedOnly", "treatsNB", "youthOnly", "remote"],
	logopedics: ["remote"],
	urologist: ["treatsNB", "transFem", "transMasc", "remote"],
	gynecologist: ["treatsNB", "transFem", "transMasc", "remote"],
	GP: ["treatsNB", "remote"]
} as const;

export const offerMapping = {
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
	GP: ["hrt", "medication"]
} as const;

export const subjectMapping = ["therapist", "psychologist", "naturopath", "other"] as const;

export const accessibleMapping = ["unknown", "yes", "no"] as const;

export const academicTitleMapping = ["dr", "prof", "prof_dr"];
