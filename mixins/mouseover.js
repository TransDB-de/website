const mouseOverTexts = {
    ffs: "Gesichtsfeminisierende OP's",
    proximitySearch: "Gebe deinen Standort ein, oder clicke hier um ihm automatisch zu ermitteln",
    location: "Dein Standort"
}

export default {
    methods: {
        getMouseover(id) {
            return mouseOverTexts[id] ?? null;
        }
    }
}
