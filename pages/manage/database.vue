<template>
	<div class="database" v-if="isAdmin">
		<div class="heading">
			<h1>Datenbank Verwaltung</h1>
			
			<Button class="backup-button" :title="mouseOverTexts['backup']" light @click="downloadBackup" >
				<DownloadIcon />
				Backup herunterladen
			</Button>
		</div>

		<nuxt-link to="/manage/help" class="help">
			<HelpCircleIcon />
			Hilfe
		</nuxt-link>

		<TextFilter @submit="filter" />

		<ul>
			<EditableEntry v-for="entry of entries" :entry="entry" :key="entry._id"
				@fetchGeo="fetchGeo" @save="updateEntry" @delete="deleteEntry"
			/>
		</ul>

		<div class="load-more">
			<Button v-if="more" center light @click="loadNextPage">Mehr anzeigen</Button>
		</div>

	</div>
</template>

<script>
import AccountMixin from "@/mixins/account";
import MouseoverMixin from "@/mixins/mouseover";

import TextFilter from "@/components/manage/TextFilter";
import EditableEntry from '@/components/manage/EditableEntry';
import Button from "@/components/utils/Button";

import { HelpCircleIcon, DownloadIcon } from 'vue-feather-icons';

export default {
	name: "database",
	components: { TextFilter, EditableEntry, HelpCircleIcon, DownloadIcon, Button },
	mixins: [ AccountMixin, MouseoverMixin ],
	meta: {
		authRequired: true
	},
	data() {
		return {
			entries: [],
			query: {},
			page: 0,
			more: true
		}
	},
	created() {
		this.loadEntries();
	},
	mounted() {
		this.$addScrollEvent(this.onScroll);
	},
	destroyed() {
		this.$removeScrollEvent(this.onScroll);
	},
	methods: {
		async loadEntries(append = false) {
			try {
				let res = await this.$axios.$post("entries/full", {filter: this.query, page: this.page});
				this.more = res.more;

				if (append) {
					this.entries = this.entries.concat(res.entries);
				} else {
					this.entries = res.entries;
				}
			} catch (e) {
				this.$errorMsg("Ein unbekannter Fehler ist aufgetreten");
				return;
			}
		},
		
		filter(query) {
			this.query = query;
			this.page = 0;
			this.loadEntries();
		},

		async fetchGeo(id) {
			try {
				await this.$axios.$patch(`entries/${id}/updateGeo`);
				this.$okMsg("Geo Update anfrage gesendet. Bitte warte ein wenig und lade die Seite dann neu");
			} catch(e) {
				this.$errorMsg("Ein unbekannter Fehler ist aufgetreten");
			}
		},

		async deleteEntry(id) {
			try {
				await this.$axios.$delete(`entries/${id}`);
				this.$okMsg("Eintrag gelöscht");
			} catch(e) {
				this.$errorMsg("Unbekannter Fehler beim löschen");
			}
			this.loadEntries();
		},

		async updateEntry(id, changes) {
			if (Object.keys(changes).length < 1) {
				return;
			}

			try {
				await this.$axios.$patch(`entries/${id}/edit`, changes);
				this.$okMsg("Änderungen gespeichert");
			} catch(e) {
				this.$errorMsg("Unbekannter Fehler beim speichern");
			}
			this.loadEntries();
		},
		
		async loadNextPage() {
			
			if (!this.more) return;

			this.page += 1;
			
			this.loadEntries(true);
			
		},
		
		onScroll(pos) {
			let scrolledHeight = Math.ceil(pos + window.innerHeight);

			// Check if user has scrolled to the bottom of the page
			if(scrolledHeight >= document.body.offsetHeight && pos > 0) {
				this.loadNextPage();
			}
			
		},

		async downloadBackup() {
			try {
				const res = await this.$axios.$get(`entries/backup`);
				const data = new Blob([JSON.stringify(res)], { type: "application/json" });

				const url = window.URL.createObjectURL(data);
				const link = document.createElement("a");

				const date = new Date();
				const fileStr = `transdb_backup_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}h${date.getMinutes()}.json`;

				link.href = url;
				link.setAttribute("download", fileStr);	
				
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch(e) {
				console.error(e);
				this.$errorMsg("Unbekannter Fehler! Datenbank konnte nicht heruntergeladen werden");
			}
			
		}
	}
}
</script>

<style scoped>
@import "../../css/load-more-button.css";

.database > .text-filter {
	align-self: center;

	max-width: 1100px;
	width: 100%;
}

.heading {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
}

.heading > h1 {
	grid-column: 2 / 3;
	margin: 0;
}

.backup-button {
	align-self: center;
	justify-self: end;
}

.help {
	align-self: center;
	font-family: "Poppins", sans-serif;
	color: var(--color-grey);
	text-decoration: none;
	font-weight: 500;
	font-size: 1.2em;
	margin-bottom: 0.6em;
}

.help > .feather {
	width: 1em;
	height: 1em;
	top: 0.125em;
	position: relative;
}

ul {
	padding: 0;
}

@media only screen and (max-width: 1100px) {
	.heading {
		display: flex;
		flex-direction: column;
	}

	.heading > h1 {
		grid-column: 2 / 3;
		margin: 0;
	}
}
</style>
