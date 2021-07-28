<template>

    <Form @submit="submit" class="submit-form" ref="form">
    
        <h1>Einen neuen Eintrag einreichen</h1>
        
        <Input type="select" name="type" errorMSG="Bitte wähle eins aus"
            :checkValid="checkValid" :invalid="errors['type']" v-model="type" required="true"
        >
            <option value="" disabled>*Art wählen*</option>
            <option value="group">Gruppe/Verein</option>
            <option value="therapist">Therapeut*in/Psychiater*in</option>
            <option value="surveyor">Gutachter*in</option>
            <option value="endocrinologist">Endokrinologische Praxis</option>
            <option value="surgeon">Operateur*in</option>
            <option value="hairremoval">Haarentfernungsstudio</option>
            <option value="logopedics">Logopäd*in</option>
        </Input>
        
        <Input name="name" v-show="type" type="text" required="true" minlength="1" maxlength="50"
            errorMSG="Muss zwischen 1 und 50 Buchstaben lang sein"
            :checkValid="checkValid" :invalid="errors['name']"
            :placeholder="type ? namePlaceholderDescriptions[type] : ''"
        />
        
        <h2>Adresse</h2>
        
        <Input name="city" type="text" placeholder="Stadt / Ort" required="true"
            errorMSG="Darf nicht leer sein" :checkValid="checkValid" :invalid="errors['city']" />
        <Input name="plz" type="text" placeholder="Postleitzahl"
            errorMSG="Ungültige Postleitzahl" :checkValid="checkValid" :invalid="errors['plz']" />
        <Input name="street" type="text" placeholder="Straße"
            errorMSG="Ungültiger Straßenname" :checkValid="checkValid" :invalid="errors['street']" />
        <Input name="house" type="text" placeholder="Hausnummer" minlength="1" maxlength="10"
            errorMSG="Muss zwischen 1 und 10 Zeichen lang sein und braucht eine Straße" :checkValid="checkValid" :invalid="errors['house']" />
        
        <h2>Ansprechpartner*in</h2>
        
        <Input name="firstName" type="text" placeholder="Vorname" minlength="2" maxlength="30"
            errorMSG="Darf nicht kürzer als 2 Zeichen, oder länger als 30 sein" :checkValid="checkValid" :invalid="errors['firstName']" />
        <Input name="lastName" type="text" placeholder="Nachname" minlength="2" maxlength="30"
            errorMSG="Darf nicht kürzer als 2 Zeichen, oder länger als 30 sein" :checkValid="checkValid" :invalid="errors['lastName']" />
        
        <h2>Kontaktdaten</h2>
        
        <Input name="email" type="email" placeholder="E-Mail Adresse" minlength="5" maxlength="320"
            errorMSG="Ungültige E-Mail Adresse" :checkValid="checkValid" :invalid="errors['email']" />
        <Input name="telephone" type="text" placeholder="Telefonnummer" minlength="5" maxlength="30"
            errorMSG="Ungültige Telefonnummer" :checkValid="checkValid" :invalid="errors['telephone']" />
        <Input name="website" type="url" placeholder="Webseite" minlength="3" maxlength="500"
            errorMSG="Ungültige Website" :checkValid="checkValid" :invalid="errors['website']" />
        
        <h2>Spezifische Angaben</h2>

        <div v-if="type === 'group'">
            
            <Errorbox errorMSG="Wähle mindestens eins aus" :invalid="errors[type]['attributes']">
                <Checkbox name="attributes[]" value="trans" placeholder="Trans* Fokus" />
                <Checkbox name="attributes[]" value="regularMeetings" placeholder="Regelmäßige Gruppentreffen" />
                <Checkbox name="attributes[]" value="consulting" placeholder="Beratungsangebot" />
                <Checkbox name="attributes[]" value="activities" placeholder="Freizeitangebote" />
            </Errorbox>

            <Input name="specials" type="text" placeholder="Besondere Angebote / Besonderheiten" maxlength="280"
                errorMSG="Darf nicht mehr als 280 Zeichen lang sein" :checkValid="checkValid" :invalid="errors['specials']" />
            
            <Input name="minAge" type="number" placeholder="Mindestalter" 
                errorMSG="Muss eine Zahl sein" :checkValid="checkValid" :invalid="errors['minAge']" />
            
        </div>
        
        <div v-if="type === 'therapist'">
            
            <Input type="select" name="subject" required="true"
                errorMSG="Wähle eine Fachrichtung aus" :checkValid="checkValid" :invalid="errors['subject']"
            >
                <option value="" disabled selected>*Fachrichtung wählen*</option>
                <option value="therapist">Psychologische*r Psychotherapeut*in</option>
                <option value="psychologist">Psychiater (Facharzt für Psychiatrie)</option>
            </Input>
    
            <h3>Angebote:</h3>
            
            <Errorbox errorMSG="Wähle midnestens eins aus" :invalid="errors[type]['offers']">
                <Checkbox name="offers[]" value="indication" placeholder="Indikation" />
                <Checkbox name="offers[]" value="therapy" placeholder="Begleittherapie" />
            </Errorbox>

        </div>
        
        <div v-if="type === 'surveyor'">
    
            <Checkbox name="attributes[]" value="enby" placeholder="Nicht-binäre Gutachten" />
            
        </div>
        
        <div v-if="type === 'surgeon'">
    
            <h3>Angebotene Operationen:</h3>
            
            <Errorbox errorMSG="Wähle midnestens eins aus" :invalid="errors[type]['offers']">
                <Checkbox name="offers[]" value="mastectomy" placeholder="Mastektomie" />
                <Checkbox name="offers[]" value="vaginPI" placeholder="Vaginoplastie (penile Inversion)" />
                <Checkbox name="offers[]" value="vaginCombined" placeholder="Vaginoplastie (kombinierte Methode)" />
                <Checkbox name="offers[]" value="ffs" placeholder="Gesichtsfeminisierende Operationen (FFS)" />
                <Checkbox name="offers[]" value="penoid" placeholder="Penoidaufbau" />
                <Checkbox name="offers[]" value="breast" placeholder="Brustaufbau" />
                <Checkbox name="offers[]" value="hyst" placeholder="Hysterektomie" />
                <Checkbox name="offers[]" value="orch" placeholder="Orchiektomie" />
                <Checkbox name="offers[]" value="clitPI" placeholder="Klitorispenoid / Metoidioplastik" />
                <Checkbox name="offers[]" value="bodyfem" placeholder="Körperfemininisierende Operationen" />
                <Checkbox name="offers[]" value="glottoplasty" placeholder="Stimmband Operationen" />
                <Checkbox name="offers[]" value="fms" placeholder="Gesichtsmaskulinisierende Operationen (FMS)" />
            </Errorbox>

        </div>
        
        <div v-if="type === 'hairremoval'">
            
            <h3>Angebote:</h3>
            <Errorbox errorMSG="Wähle midnestens eins aus" :invalid="errors[type]['offers']">
                <Checkbox name="offers[]" value="laser" placeholder="Laser" />
                <Checkbox name="offers[]" value="ipl" placeholder="IPL" />
                <Checkbox name="offers[]" value="electro" placeholder="Elektroepilation" />
                <Checkbox name="offers[]" value="electroAE" placeholder="Elektroepilation mit Lokalanästhesie" />
            </Errorbox>

            <h3>Weitere Infos:</h3>
            <Checkbox name="attributes[]" value="insurancePay" placeholder="Haben Krankenkassen hier Kosten übernommen?" />
            <Checkbox name="attributes[]" value="transfriendly" placeholder="Ist das Studio Trans*freundlich?" />
            <Checkbox name="attributes[]" value="hasDoctor" placeholder="Wird das Studio von einer Arztperson geleitet?" />
            
        </div>

        <div v-if="type === 'endocrinologist'">
            <h3>Weitere Infos:</h3>
            <Checkbox name="attributes[]" value="treatsNB" placeholder="Behandelt nicht-binäre Personen" />
        </div>
        
        <h3>Räumlichkeiten:</h3>

        <ThreeStateCheckbox name="accessible" :v-model="accessible" placeholder="Sind Barrierefrei" />

        <p>
            Bitte beachte, dass dein Eintrag von unserem Team überprüft wird<br/>bevor er auf der Seite zu finden ist.
        </p>
        
        <Button @click="checkValid += 1; errors = {}; initErrors();" center :loading="loading">Abschicken</Button>
        
    </Form>
    
</template>

<script>
import Form from "@/components/utils/Form";
import Index from "@/pages/index";
import Checkbox from "@/components/utils/Checkbox";
import Button from "@/components/utils/Button";
import ThreeStateCheckbox from "@/components/utils/ThreeStateCheckbox";
import Input from "@/components/utils/Input";
import Errorbox from "@/components/utils/Errorbox";
import EntryMixin from "@/mixins/entry";

export default {
    name: "submit.vue",
    components: {Button, Checkbox, Index, Form, ThreeStateCheckbox, Input, Errorbox},
    mixins: [EntryMixin],
    data() {
        return {
            type: "",
            loading: false,
            accessible: 0,
            namePlaceholderDescriptions: {
                group: "Name der Gruppe",
                therapist: "Name der Praxis",
                surveyor: "Name der Praxis / der Gutachter*in",
                endocrinologist: "Name der Praxis",
                surgeon: "Name des Arztes / der Klinik",
                hairremoval: "Name des Studios",
                logopedics: "Name der Praxis"
            },
            checkValid: 0,
            errors: {}
        }
    },
    mounted() {
        // initialize errors object
        this.initErrors();
    },
    head() {
        return {
            title: "Neuer Eintrag",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Reiche einen neuen Eintrag nach Trans*DB ein und teile deine Erfahrung, um anderen Leuten zu helfen."
                }
            ]
        }
    },
    methods: {
    
        submit: async function(form) {
            
            this.loading = true;
            
            let res;
            
            try {
                res = await this.$axios.$post("entries", form);

                this.$okMsg("Eintrag Eingereicht");
            } catch (e) {
                
                if(e.response.status === 422) {

                    if (e.response.data.problems) {
                        this.parseErrors(e.response.data.problems);
                    }

                    this.$warnMsg("Bitte überprüfe deine Eingaben");
                } else if(e.response.status === 429) {
                    this.$errorMsg("Du stellst zu viele Anfragen");
                } else {
                    this.$errorMsg("Ein unbekannter Fehler ist aufgetreten");
                }
                
                this.loading = false;
                return;
                
            }
            
            this.loading = false;
            this.$refs.form.resetForm();
            
            this.$router.push("/submitted");
            
        },

        initErrors() {
            var keys = Object.keys(this.typeMappingData);

            keys.forEach(key => {
                this.errors[key] = {};
            });
        },

        parseErrors(errors) {
            // reset error list
            this.errors = {};
            this.initErrors();

            errors.forEach(problem => {
                if ((problem.field === "offers" || problem.field === "attributes") && this.type) {
                    this.errors[this.type][problem.field] = true;
                } else {
                    this.errors[problem.field] = true;
                }
            });
        }
    
    }
}
</script>

<style scoped>
.submit-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin: 20px;
    flex-grow: 1;
    text-align: center;
}

.submit-form > .error {
    color: var(--color-error);
    margin-top: 0;
    max-width: 500px;
    text-align: center;
    border-bottom: none;
}

.submit-form h1, .submit-form h2 {
    margin: 20px 0;
    text-align: left;
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-light);
}
</style>