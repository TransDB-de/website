const mouseOverTexts = {
    ffs: "Gesichtsfeminisierende OP's",
    proximitySearch: "Standort ermitteln",
    location: "Dein Standort",
    locationSearch: "Gebe einen Ort oder eine Postleitzahl ein, und drücke auf 🔍",
    locationSearchButton: "Suchen",
    distance: "Entfernung zu deinem Standort"
}

export default {
    created() {
        this.mouseOverTexts = mouseOverTexts;
    }
}
