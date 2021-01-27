const typeMapping = {
    "": "Alle Kategorien",
    group: "Gruppe/Verein",
    therapist: "Therapeut*in/Psychiater*in",
    endocrinologist: "Endokrinologische Praxis",
    surgeon: "Operateur*in",
    logopedics: "Logopäd*in",
    hairremoval: "Haarentfernungsstudio"
}

const attributeMapping = {
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
    }
}

const offerMapping = {
    therapist: {
        indication: "Indikationen",
        therapy: "Begleittherapie",
        expertise: "Gutachten"
    },
    surgeon: {
        mastectomy: "Mastektomie",
        vaginPI: "Vaginoplastie (penile Inversion)",
        vaginCombined: "Vaginoplastie (kombinierte Methode)",
        ffs: "Gesichtsfeminisierende OP's (FFS)",
        penoid: "Penoidaufbau",
        breast: "Brustaufbau",
        hyst: "Hysterektomie",
        orch: "Orchiektomie",
        clitPI: "Klitorispenoid / Metoidioplastik",
        bodyfem: "Körperfemininisierende OP's"
    }
}

const subjectMapping = {
    therapist: "Psychologische*r Psychotherapeut*in",
    psychologist: "Psychiater (Facharzt für Psychiatrie)"
}

export default {

    created() {
        this.typeMapping = typeMapping;
        this.attributeMapping = attributeMapping;
        this.offerMapping = offerMapping;
        this.subjectMapping = subjectMapping;
    }

}
