const mouseOverTexts = {
    ffs: "Gesichtsfeminisierende OP's",
    proximitySearch: "Standort ermitteln",
    location: "Dein Standort",
    locationSearch: "Gebe einen Ort oder eine Postleitzahl ein, und drücke auf 🔍",
    locationSearchButton: "Suchen",
    distance: "Entfernung zu deinem Standort",
    logout: "Abmelden",
    accountSettings: "Account Einstellungen",
    editEntry: "Eintrag bearbeiten",
    deleteEntry: "Eintrag löschen",
    approveEntry: "Eintrag freischalten",
    saveChanges: "Änderungen speichern",
    discardChanges: "Änderungen verwerfen",
    filter: "Einträge filtern",
    help: "Hilfe",
    reloadGeo: "Versuche die Geodaten erneut beim Api abzurufen"
}

export default {
    created() {
        this.mouseOverTexts = mouseOverTexts;
    }
}
