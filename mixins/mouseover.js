const mouseOverTexts = {
	// Types
	"": "Alle Kategorien von Einträgen",
	group: "LGBT+ oder trans* Gruppen, Vereine und Stammtische",
	therapist: "Therapeut*in mit trans* spezifischer Erfahrung",
	surveyor: "TSG Gutachter*innen",
	endocrinologist: "Endokrinologische Arztpraxis für Hormon-Therapie",
	surgeon: "Operateur*innen / Chirurgen für trans-relevante OPs",
	logopedics: "Logopäd*innen / Logopädie Praxen für Stimmtraining",
	hairremoval: "Haarentfernungs-Studios und Arztpraxen",
	
	// Attributes
	trans: "Primär eine Trans Gruppe / Verein, im Gegensatz zu allgemeinen LGBT+ Gruppen",
	regularMeetings: "Treffen sich regelmäßig",
	consulting: "Bietet Beratung für trans* Personen an",
	activities: "Bietet Freizeitangebote an",

	insurancePay: "Krankenkassen haben hier schon mal eine Kostenübernahme bewilligt",
	transfriendly: "Guter Umgang mit trans* Personen",
	hasDoctor: "Hat Ärztliche Begleitung, oder Anschluss an einen Arzt",

	enby: "Stellt Gutachten für nicht-binäre Personen aus",

	treatsNB: "Behandelt nicht-binäre Personen",

	// Offers
	indication: "Schreibt Indikationen (für z.B. Hormon Therapie)",
	therapy: "Bietet Begleittherapie für trans* Personen",

	mastectomy: "Mastektomie",
	vaginPI: "Vaginoplastie mit der Methode penile Inversion",
	vaginCombined: "Vaginoplastie mit der kombinierten Methode",
	ffs: "Gesichtsfeminisierende Operationen (Abkürzung: FFS)",
	penoid: "Penoidaufbau",
	breast: "Brustaufbau",
	orch: "Orchiektomie",
	clitPI: "Klitorispenoid / Metoidioplastik",
	bodyfem: "Körperfemininisierende Operationen",
	glottoplasty: "Stimmband Operationen, wie Stimmfeminisierung",
	fms: "Gesichtsmaskulinisierende Operationen (Abkürzung: FMS)",

	laser: "Epilation mit Hilfe eines Lasers",
	ipl: "Epliation durch starke Lichtimpulse. Nicht dauerhaft",
	electro: "Dauerhafte Epilation durch Strom",
	electroAE: "Elektroepilation mit lokaler Betäubung",

	// Buttons
	applyFilter: "Suchfilter anwenden",
	proximitySearch: "Standort ermitteln",
	locationSearchButton: "Suchen",
	searchNearbyButton: "Weitere Einträge in der Umgebung dieses Eintrags suchen",

	// Info
	location: "Dein Standort",
	locationSearch: "Gebe einen Ort oder eine Postleitzahl ein, und drücke auf 🔍",
	distance: "Entfernung zu deinem Standort",
	barrierFree: "Räumlichkeiten sind Barrierefrei zugänglich",
	notBarrierFree: "Räumlichkeiten nicht Barrierefrei zugänglich",
	isBarrierFree: "Sind die Räumlichkeiten Barrierefrei zugänglich?",

	// Management
	logout: "Abmelden",
	accountSettings: "Account-Einstellungen",
	editEntry: "Eintrag bearbeiten",
	deleteEntry: "Eintrag löschen",
	approveEntry: "Eintrag freischalten",
	saveChanges: "Änderungen speichern",
	discardChanges: "Änderungen verwerfen",
	copyLink: "Link zum Eintrag in Zwischenablage kopieren",
	filter: "Einträge filtern",
	help: "Hilfe",
	reloadGeo: "Versuche die Geodaten erneut beim Api abzurufen",
	backup: "Backup der Datenbank herunterladen"
}

export default {
	created() {
		this.mouseOverTexts = mouseOverTexts;
	}
}
