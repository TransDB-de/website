<template>
	
	<div class="full-entry">
		
		<div>
			
			<h1>{{ entry.name }}</h1>
			
			<span>
				{{ typeMapping[entry.type] }}
			</span>
			
			<span>
				<b>Person:</b> {{ person }}
			</span>
			
			<span>
				<b>Adresse:</b> {{ address }}
			</span>
			
			<span>
				<b>Email:</b> {{ entry.email }}
			</span>
			
			<span>
				<b>Webseite:</b> <a>{{ entry.website ? entry.website : 'Nicht angegeben' }}</a>
			</span>
			
			<span>
				<b>Telefon:</b> {{ entry.telephone ? entry.telephone : 'Nicht angegeben' }}
			</span>
			
			<span v-if="offerMapping[entry.type]">
				<b>Angebote:</b> {{ offers }}
			</span>
			
			<span v-if="attributeMapping[entry.type]">
				<b>Attribute:</b> {{ attributes }}
			</span>
			
			<span v-if="subjectMapping[entry.type]">
				<b>Fachrichtung:</b> {{ entry.meta.subject ? subjectMapping[entry.type][entry.meta.subject] : 'Nicht angegeben' }}
			</span>
			
			<span v-if="typeHasSpecials(entry.type)">
				<b>Besonderheiten:</b> {{ entry.meta.specials ? entry.meta.specials : 'Nicht angegeben' }}
			</span>
			
			<span v-if="typeHasMinAge(entry.type)">
				<b>Mindestalter:</b> {{ entry.meta.minAge ? entry.meta.minAge : 'Nicht angegeben' }}
			</span>

			<span>
				<b>Barrierefrei:</b> {{ entry.accessible ? accessibleMapping[entry.accessible] : 'Unbekannt' }}
			</span>
			
		</div>
		
		<div>
		
			<Button center icononly title="Freischalten" @click="approve" :loading="approveLoading">
				<check-icon />
			</Button>
			<Button color="red" center icononly title="Löschen" @click="remove" :loading="deleteLoading">
				<trash-icon />
			</Button>
			
		</div>
		
	</div>
	
</template>

<script>
import EntryMixin from "@/mixins/entry";
import Button from "@/components/utils/Button";
import { TrashIcon, CheckIcon } from "vue-feather-icons";

export default {
	name: "FullEntry",
	components: {Button, TrashIcon, CheckIcon},
	mixins: [EntryMixin],
	props: {
		entry: Object
	},
	computed: {
		
		person: function () {
			if(this.entry.firstName || this.entry.lastName) {
				return this.entry.firstName + " " + this.entry.lastName;
			} else {
				return "Nicht angegeben"
			}
		},
		address: function () {
			return `${this.entry.address.street} ${this.entry.address.house}, ${this.entry.address.plz} ${this.entry.address.city}`;
		},
		attributes: function () {
			
			if(this.entry.meta.attributes) {
				
				return this.entry.meta.attributes.map((a) => this.attributeMapping[this.entry.type]?.[a]).join(", ");
				
			} else {
				return "Nicht angegeben";
			}
			
		},
		offers: function () {
			
			if(this.entry.meta.offers) {
				
				return this.entry.meta.offers.map((a) => this.offerMapping[this.entry.type]?.[a]).join(", ");
				
			} else {
				return "Nicht angegeben";
			}
			
		}
		
	},
	data() {
		return {
			approveLoading: false,
			deleteLoading: false
		}
	},
	methods: {
		
		approve: async function () {
			
			this.approveLoading = true;
			
			try {
				await this.$axios.$patch("entries/" + this.entry._id + "/approve");

				this.$okMsg("Eintrag freigeschaltet");
			} catch (e) {
				this.$errorMsg("Fehler beim freischalten. Eintrag konnte nicht freigeschaltet werden");
				return;
			}
			
			this.approveLoading = false;
	
			this.$emit("removed", this.entry._id);
			
		},
		
		remove: async function() {
			
			let sure = confirm("Soll dieser Eintrag wirklich gelöscht werden?");
		
			if(!sure) return;
			
			this.deleteLoading = true;
		
			try {
				await this.$axios.$delete("entries/" + this.entry._id);

				this.$okMsg("Eintrag gelöscht");
			} catch (e) {
				this.$errorMsg("Fehler beim löschen. Eintrag konnte nicht gelöscht werden");
				return;
			}
		
			this.deleteLoading = false;
			
			this.$emit("removed", this.entry._id);
		
		}
		
	}
}
</script>

<style scoped>
.full-entry {
	display: flex;
	background-color: var(--color-entry);
	box-shadow: 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	border-radius: 4px;
	padding: 0 0 0 10px;
	margin-bottom: 20px;
	word-break: break-word;
}

.full-entry h1 {
	font-size: 24px;
	margin: 0;
	font-weight: 500;
	text-align: left;
}

.full-entry > div {
	display: flex;
	flex-direction: column;
	margin: 10px;
}
.full-entry > div:first-child {
	flex-grow: 1;
}

.full-entry > div button {
	margin-bottom: 10px;
	width: 40px;
	height: 40px;
}
</style>