export const typeMapping = [
	"",
	"Group",
	"Therapist",
	"Endocrinologist",
	"Surgeon",
	"Logopedics",
	"Hairremoval",
	"Urologist",
	"Gynecologist",
	"GP",
	"Pharmacy",
	"Cryo"
];

export const attributeMapping: Record<string, string[]> = {
	Group: ["Trans", "RegularMeetings", "Consulting", "Activities", "Remote"],
	Hairremoval: ["InsurancePay", "Transfriendly", "HasDoctor"],
	Surgeon: ["SelfPayedOnly", "Remote"],
	Endocrinologist: ["TreatsEnby", "Remote"],
	Therapist: ["SelfPayedOnly", "TreatsEnby", "YouthOnly", "Remote"],
	Logopedics: ["Remote"],
	Urologist: ["TreatsEnby", "TransFem", "TransMasc", "Remote"],
	Gynecologist: ["TreatsEnby", "TransFem", "TransMasc", "Remote"],
	GP: ["TreatsEnby", "Remote"],
	Pharmacy: ["Shipping", "SingleUseVials", "ReuseVial", "Prefilled"],
	Cryo: ["InsurancePay"]
};

export const offerMapping: Record<string, string[]> = {
	Therapist: ["Indication", "Therapy"],
	Surgeon: [
		"Mastectomy",
		"VaginPI",
		"VaginCombined",
		"VaginColon",
		"PPVagin",
		"Ffs",
		"Penoid",
		"Breast",
		"Hyst",
		"Orch",
		"ClitPI",
		"Bodyfem",
		"Glottoplasty",
		"Fms"
	],
	Hairremoval: ["Laser", "Ipl", "Electro", "ElectroAE"],
	Urologist: ["Hrt", "Medication"],
	Gynecologist: ["Hrt", "Medication"],
	GP: ["Hrt", "Medication"],
	Endocrinologist: ["HormoneGel", "HormoneInjections", "HormonePills", "HormonePatches", "Progesterone", "EDPills"],
	Pharmacy: ["EInjection", "Cpa"],
	Cryo: ["FreezesSperm", "FreezesEggs"]
};

export const subjectMapping: Record<string, string[]> = {
	Therapist: ["Therapist", "Psychologist", "Naturopath", "Other"]
};

export const accessibleMapping = ["unknown", "yes", "no"];

export const academicTitleMapping = ["Dr", "Prof", "ProfDr"];

export function makeTranslatedMapping(mapping: string[] = [], translation: Record<string, string>) {
	let m: Record<string, string> = {};

	for (const key of mapping) {
		m[key] = translation[key];
	}

	return m;
}
