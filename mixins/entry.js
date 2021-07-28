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
    },
    endocrinologist: {
        treatsNB: "Behandelt NB Personen"
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

export const accessibleMapping = {
    "unkown": "Unbekannt",
    "yes": "Barrierefrei",
    "no": "Nicht Barrierefrei"
}

export function typeHasSpecials(type) {
    type = type.toLowerCase();
    switch (type) {
        case "group":
            return true;
        default:
            return false;
    }
}

export function typeHasMinAge(type) {
    type = type.toLowerCase();
    switch (type) {
        case "group":
            return true;
        default:
            return false;
    }
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
        this.accessibleMapping = accessibleMapping;
        this.typeHasSpecials = typeHasSpecials;
        this.typeHasMinAge = typeHasMinAge;
    }

}
