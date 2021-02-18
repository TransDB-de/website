<template>

    <Form @submit="submit" class="submit-form" reset>
    
        <h1>Einen neuen Eintrag einreichen</h1>
        
        <select name="type" v-model="type" required>
            <option value="" disabled>*Art wählen*</option>
            <option value="group">Gruppe/Verein</option>
            <option value="therapist">Therapeut*in/Psychiater*in</option>
            <option value="surveyor">Gutachter*in</option>
            <option value="endocrinologist">Endokrinologische Praxis</option>
            <option value="surgeon">Operateur*in</option>
            <option value="hairremoval">Haarentfernungsstudio</option>
            <option value="logopedics">Logopäd*in</option>
        </select>
        
        <input name="name" v-if="type" :placeholder="namePlaceholderDescriptions[type]" type="text" required minlength="1" maxlength="50" />
        
        <h2>Adresse</h2>
        
        <input name="city" type="text" placeholder="Stadt / Ort" required />
        <input name="plz" type="text" placeholder="Postleitzahl" required />
        <input name="street" type="text" placeholder="Straße" required />
        <input name="house" type="text" placeholder="Hausnummer" required minlength="1" maxlength="10" />
        
        <h2>Ansprechpartner*in</h2>
        
        <input name="firstName" type="text" placeholder="Vorname" />
        <input name="lastName" type="text" placeholder="Nachname" />
        
        <h2>Kontaktdaten</h2>
        
        <input name="email" type="email" placeholder="E-Mail Adresse" minlength="5" maxlength="320" />
        <input name="telephone" type="text" placeholder="Telefonnummer" minlength="5" maxlength="30" />
        <input name="website" type="url" placeholder="Webseite" minlength="3" maxlength="500" />
        
        <div v-if="type === 'group'">
        
            <h2>Spezifische Angaben</h2>
            
            <Checkbox name="attributes[]" value="trans" placeholder="Trans* Fokus" />
            <Checkbox name="attributes[]" value="regularMeetings" placeholder="Regelmäßige Gruppentreffen" />
            <Checkbox name="attributes[]" value="consulting" placeholder="Beratungsangebot" />
            <Checkbox name="attributes[]" value="activities" placeholder="Freizeitangebote" />
            
            <input name="specials" type="text" placeholder="Besondere Angebote / Besonderheiten"  />
            
            <input name="minAge" type="number" placeholder="Mindestalter" />
            
        </div>
        
        <div v-if="type === 'therapist'">
    
            <h2>Spezifische Angaben</h2>
            
            <select name="subject">
                <option value="" disabled selected>*Fachrichtung wählen*</option>
                <option value="therapist">Psychologische*r Psychotherapeut*in</option>
                <option value="psychologist">Psychiater (Facharzt für Psychiatrie)</option>
            </select>
    
            <h3>Angebote:</h3>
            
            <Checkbox name="offers[]" value="indication" placeholder="Indikation" />
            <Checkbox name="offers[]" value="therapy" placeholder="Begleittherapie" />
            
        </div>
        
        <div v-if="type === 'surveyor'">
    
            <h2>Spezifische Angaben</h2>
    
            <Checkbox name="attributes[]" value="enby" placeholder="Nicht-binäre Gutachten" />
            
        </div>
        
        <div v-if="type === 'surgeon'">
    
            <h2>Spezifische Angaben</h2>
    
            <h3>Angebotene Operationen:</h3>
            
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
            
        </div>
        
        <div v-if="type === 'hairremoval'">
    
            <h2>Spezifische Angaben</h2>
            
            <h3>Angebote:</h3>
            <Checkbox name="offers[]" value="laser" placeholder="Laser" />
            <Checkbox name="offers[]" value="ipl" placeholder="IPL" />
            <Checkbox name="offers[]" value="electro" placeholder="Elektroepilation" />
            <Checkbox name="offers[]" value="electroAE" placeholder="Elektroepilation mit Lokalanästhesie" />
    
            <h3>Weitere Infos:</h3>
            <Checkbox name="attributes[]" value="insurancePay" placeholder="Haben Krankenkassen hier Kosten übernommen?" />
            <Checkbox name="attributes[]" value="transfriendly" placeholder="Ist das Studio Trans*freundlich?" />
            <Checkbox name="attributes[]" value="hasDoctor" placeholder="Wird das Studio von einer Arztperson geleitet?" />
            
        </div>
        
        <p>
            Bitte beachte, dass dein Eintrag von unserem Team überprüft wird<br/>bevor er auf der Seite zu finden ist.
        </p>
        
        <Button center :loading="loading">Abschicken</Button>
        
        <br/>
        
    </Form>
    
</template>

<script>
import Form from "@/components/utils/Form";
import Index from "@/pages/index";
import Checkbox from "@/components/utils/Checkbox";
import Button from "@/components/utils/Button";

export default {
    name: "submit.vue",
    components: {Button, Checkbox, Index, Form},
    data() {
        return {
            type: "",
            loading: false,
            namePlaceholderDescriptions: {
                group: "Name der Gruppe",
                therapist: "Name der Praxis",
                surveyor: "Name der Praxis / der Gutachter*in",
                endocrinologist: "Name der Praxis",
                surgeon: "Name des Arztes / der Klinik",
                hairremoval: "Name des Studios",
                logopedics: "Name der Praxis"
            }
        }
    },
    methods: {
    
        submit: async function(form) {
            
            this.loading = true;
            
            let res;
            
            try {
                res = await this.$axios.$post("entries", form);
            } catch (e) {
            
            }
            
            this.loading = false;
            
            this.$router.push("/");
            
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
    padding: 20px;
    flex-grow: 1;
    text-align: center;
}
</style>