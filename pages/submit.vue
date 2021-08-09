<template>

	<Form @submit="submit" class="submit-form" ref="form">
	
		<h1>Einen neuen Eintrag einreichen</h1>
		
		<Input type="select" name="type" errorMSG="Bitte wähle eins aus"
			:checkValid="checkValid" :invalid="errors['type']" v-model="type" required="true">

			<option v-for="(val, key) in typeMapping" :key="key" :value="key">{{ val }}</option>

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
				<Checkbox name="attributes[]" v-for="(val, key) in attributeMapping.group" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
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
				<Checkbox name="offers[]" v-for="(val, key) in offerMapping.therapist" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]"/>
			</Errorbox>

		</div>
		
		<div v-if="type === 'surveyor'">
	
			<Checkbox name="attributes[]" v-for="(val, key) in attributeDetails.surveyor" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
			
		</div>
		
		<div v-if="type === 'surgeon'">
	
			<h3>Angebotene Operationen:</h3>
			
			<Errorbox errorMSG="Wähle midnestens eins aus" :invalid="errors[type]['offers']">
				<Checkbox name="offers[]" v-for="(val, key) in offerMapping.surgeon" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
			</Errorbox>

		</div>
		
		<div v-if="type === 'hairremoval'">
			
			<h3>Angebote:</h3>
			<Errorbox errorMSG="Wähle midnestens eins aus" :invalid="errors[type]['offers']">
				<Checkbox name="offers[]" v-for="(val, key) in offerMapping.hairremoval" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
			</Errorbox>

			<h3>Weitere Infos:</h3>
			<Checkbox name="attributes[]" v-for="(val, key) in attributeDetails.hairremoval" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
			
		</div>

		<div v-if="type === 'endocrinologist'">
			<h3>Weitere Infos:</h3>
			<Checkbox name="attributes[]" v-for="(val, key) in attributeDetails.endocrinologist" :key="key" :value="key" :placeholder="val" :title="mouseOverTexts[key]" />
		</div>
		
		<h3>Räumlichkeiten:</h3>

		<ThreeStateCheckbox name="accessible" :v-model="accessible" placeholder="Sind Barrierefrei" :title="mouseOverTexts['isBarrierFree']" />

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
import MouseoverMixin from "@/mixins/mouseover";

export default {
	name: "submit.vue",
	components: {Button, Checkbox, Index, Form, ThreeStateCheckbox, Input, Errorbox},
	mixins: [EntryMixin, MouseoverMixin],
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