export const typeMapping = {
	"": "Alle Kategorien",
	group: "Gruppe/Verein",
	therapist: "Therapeut*in/Psychiater*in",
	surveyor: "Gutachter*in",
	endocrinologist: "Endokrinologische Praxis",
	surgeon: "Operateur*in",
	logopedics: "Logopäd*in",
	hairremoval: "Haarentfernung"
}

// for using the mappings as data key references
let {[""]: _deletedKey, ..._typeMappingData} = typeMapping;
export const typeMappingData = _typeMappingData;

export const typeDescriptions = {
	group: "Name der Gruppe",
	therapist: "Name der Praxis",
	surveyor: "Name der Praxis / der Gutachter*in",
	endocrinologist: "Name der Praxis",
	surgeon: "Name des Arztes / der Klinik",
	hairremoval: "Name des Studios",
	logopedics: "Name der Praxis"
}

export const attributeMapping = {
	group: {
		trans: "Transfokus",
		regularMeetings: "Regelmäßige Treffen",
		consulting: "Beratungsangebot",
		activities: "Freizeitangebote"
	},
	hairremoval: {
		insurancePay: "Kostenübernahme",
		transfriendly: "Transfreundlich",
		hasDoctor: "Ärztlich"
	},
	surveyor: {
		enby: "NB Gutachten"
	},
	endocrinologist: {
		treatsNB: "Behandelt NB Personen"
	}
}

export const attributeDetails = {
	hairremoval: {
		insurancePay: "Haben Krankenkassen hier Kosten übernommen?",
		transfriendly: "Ist die Praxis / das Studio trans*freundlich?",
		hasDoctor: "Wird die Praxis / das Studio von einer Arztperson geführt, oder begleitet?"
	},
	endocrinologist: {
		treatsNB: "Behandelt nicht-binäre Personen"
	},
	surveyor: {
		enby: "Stellt Gutachten für nicht-binäre Personen aus"
	}
}

export const offerMapping = {
	therapist: {
		indication: "Indikationen",
		therapy: "Begleittherapie"
	},
	surgeon: {
		mastectomy: "Mastektomie",
		vaginPI: "Vaginoplastie (penile Inversion)",
		vaginCombined: "Vaginoplastie (kombinierte Methode)",
		ffs: "Gesichtsfeminisierende OPs (FFS)",
		penoid: "Penoidaufbau",
		breast: "Brustaufbau",
		hyst: "Hysterektomie",
		orch: "Orchiektomie",
		clitPI: "Klitorispenoid / Metoidioplastik",
		bodyfem: "Körperfemininisierende OPs",
		glottoplasty: "Stimmband OPs",
		fms: "Gesichtsmaskulinisierende OPs (FMS)"
	},
	hairremoval: {
		laser: "Laserepilation",
		ipl: "IPL",
		electro: "Elektroepilation",
		electroAE: "Elektroepilation mit Lokalanästhesie"
	}
}

export const subjectMapping = {
	therapist: {	
		therapist: "Psychologische*r Psychotherapeut*in",
		psychologist: "Psychiater (Facharzt für Psychiatrie)"
	}
}
