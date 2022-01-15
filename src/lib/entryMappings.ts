type Dict = {[key: string]: string};

export const typeMapping: Dict = {
	"": "Alle Kategorien",
	group: "Gruppe/Verein",
	therapist: "Therapeut*in/Psychiater*in",
	surveyor: "Gutachter*in",
	endocrinologist: "Endokrinologische Praxis",
	surgeon: "Operateur*in",
	logopedics: "Logopäd*in",
	hairremoval: "Haarentfernung",
	urologist: "Urologie",
	gynecologist: "Gynäkologie",
	GP: "Allgemeinmediziner*in/Hausärzt*in"
}

// for using the mappings as data key references
let {"": _deletedKey, ..._typeMappingData} = typeMapping;
export const typeMappingData = _typeMappingData;

export const typeDescriptions: Dict = {
	group: "Name der Gruppe",
	therapist: "Name der Praxis",
	surveyor: "Name der Praxis / der Gutachter*in",
	endocrinologist: "Name der Praxis",
	surgeon: "Name des Arztes / der Klinik",
	hairremoval: "Name des Studios",
	logopedics: "Name der Praxis",
	urologist: "Name der Praxis",
	gynecologist: "Name der Praxis",
	GP: "Name der Praxis"
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
	surgeon: {
		selfPayedOnly: "Nur Selbstzahler"
	},
	endocrinologist: {
		treatsNB: "Behandelt NB Personen"
	},
	therapist: {
		selfPayedOnly: "Nur Selbstzahler",
		treatsNB: "Behandelt NB Personen",
		youthOnly: "Kinder- und Jugend"
	},
	urologist: {
		treatsNB: "Behandelt NB Personen",
		transFem: "Trans*feminin freundlich",
		transMask: "Trans*maskulin freundlich"
	},
	gynecologist: {
		treatsNB: "Behandelt NB Personen",
		transFem: "Trans*feminin freundlich",
		transMask: "Trans*maskulin freundlich"
	},
	GP: {
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
	},
	surgeon: {
		selfPayedOnly: "Kein Kassensitz oder Kostenerstattung. Behandlet nur Selbstzahler"
	},
	therapist: {
		selfPayedOnly: "Kein Kassensitz oder Kostenerstattung. Bietet nur Therpaie für Selbstzahler",
		treatsNB: "Behandelt nicht-binäre Personen",
		youthOnly: "Kinder- und Jugendtherapeut*in"
	},
	urologist: {
		treatsNB: "Behandelt nicht-binäre Personen",
		transFem: "Trans*feminin freundlich",
		transMask: "Trans*maskulin freundlich"
	},
	gynecologist: {
		treatsNB: "Behandelt nicht-binäre Personen",
		transFem: "Trans*feminin freundlich",
		transMask: "Trans*maskulin freundlich"
	},
	GP: {
		treatsNB: "Behandelt nicht-binäre Personen"
	}
}

export const offerMapping = {
	surveyor: {
		remote: "Remote Gespräche"
	},
	endocrinologist: {
		remote: "Remote Gespräche"
	},
	therapist: {
		indication: "Indikationen",
		therapy: "Begleittherapie",
		remote: "Remote Gespräche"
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
		fms: "Gesichtsmaskulinisierende OPs (FMS)",
		remote: "Remote Gespräche"
	},
	hairremoval: {
		laser: "Laserepilation",
		ipl: "IPL",
		electro: "Elektroepilation",
		electroAE: "Elektroepilation mit Lokalanästhesie"
	},
	urologist: {
		hrt: "Begleitet Hormontherapie",
		medication: "Verschreibt Hormonmedikation",
		remote: "Remote Gespräche"
	},
	gynecologist: {
		hrt: "Begleitet Hormontherapie",
		medication: "Verschreibt Hormonmedikation",
		remote: "Remote Gespräche"
	},
	GP: {
		hrt: "Begleitet Hormontherapie",
		medication: "Verschreibt Hormonmedikation",
		remote: "Remote Gespräche"
	}
}

export const subjectMapping = {
	therapist: {
		therapist: "Psychologische*r Psychotherapeut*in",
		psychologist: "Psychiater (Facharzt für Psychiatrie)",
		naturopath: "Heilpraktiker*in",
		other: "Andere Fachrichtung"
	}
}

export const accessibleMapping: Dict = {
	unkown: "Unbekannt",
	yes: "Barrierefrei",
	no: "Nicht Barrierefrei"
}