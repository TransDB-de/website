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
        ffs: "Gesichtsfeminisierende OP's (FFS)",
        penoid: "Penoidaufbau",
        breast: "Brustaufbau",
        hyst: "Hysterektomie",
        orch: "Orchiektomie",
        clitPI: "Klitorispenoid / Metoidioplastik",
        bodyfem: "Körperfemininisierende OP's"
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

export const accessibleMapping = {
    null: "Unbekannt",
    true: "Barrierefrei",
    false: "Nicht Barrierefrei"
}

/** for using the mappings as data key references */
let {[""]: _deletedKey, ..._typeMappingData} = typeMapping;
export const typeMappingData = _typeMappingData;

export default {

    created() {
        this.typeMapping = typeMapping;
        this.attributeMapping = attributeMapping;
        this.offerMapping = offerMapping;
        this.subjectMapping = subjectMapping;
        this.typeMappingData = typeMappingData;
        this.accessibleMapping = accessibleMapping
    }

}
