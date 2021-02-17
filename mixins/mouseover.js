const mouseOverTexts = {
    // Types
    "": "Alle Kategorien von Einträgen",
    group: "LGBT+ oder trans* Gruppen, Vereine und Stammtische",
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

    // Offers
    indication: "Schreibt Indikationen (für zB. Hormon Therapie)",
    therapy: "Bietet Begleittherapie für trans* Personen",

    laser: "Epilation mit Hilfe eines Lasers",
    ipl: "Epliation durch starke Lichtimpulse. Nicht dauerhaft",
    electro: "Dauerhafte Epilation durch Strom",
    electroAE: "Elektroepilation mit lokaler Betäubung",

    // Buttons
    applyFilter: "Suchfilter anwenden",
    proximitySearch: "Standort ermitteln",
    locationSearchButton: "Suchen",

    // Info
    location: "Dein Standort",
    locationSearch: "Gebe einen Ort oder eine Postleitzahl ein, und drücke auf 🔍",
    distance: "Entfernung zu deinem Standort",

    // Management
    logout: "Abmelden",
    accountSettings: "Account Einstellungen",
    editEntry: "Eintrag bearbeiten",
    deleteEntry: "Eintrag löschen",
    approveEntry: "Eintrag freischalten",
    saveChanges: "Änderungen speichern",
    discardChanges: "Änderungen verwerfen",
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
