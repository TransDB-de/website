export default {

    data() {
        return {
            typeMapping: {
                "": "Alle Kategorien",
                group: "Gruppe/Verein",
                therapist: "Therapeut*in/Psychiater*in",
                endocrinologist: "Endokrinologische Praxis",
                surgeon: "Operateur*in",
                logopedics: "Logopäd*in",
                hairremoval: "Haarentfernungsstudio"
            },
            
            attributeMapping: {
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
            },
            
            offerMapping: {
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
            },
            
            subjectMapping: {
                therapist: "Psychologische*r Psychotherapeut*in",
                psychologist: "Psychiater (Facharzt für Psychiatrie)"
            }
        }
    }

}