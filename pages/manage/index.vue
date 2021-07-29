<template>

	<div class="management">

		<h1>Ausstehende Einträge</h1>
		
		<ul>
			<FullEntry v-for="entry of entries" :entry="entry" :key="entry._id" @removed="loadEntries()"></FullEntry>
		</ul>
		
		<div class="load-more">
			<Button v-if="more" center light @click="loadNextPage">Mehr anzeigen</Button>
		</div>

	</div>
	
</template>

<script>
import Button from "@/components/utils/Button";
import FullEntry from "@/components/FullEntry";
import AccountMixin from "@/mixins/account";

export default {
	name: "manage",
	components: { FullEntry, Button },
	mixins: [ AccountMixin ],
	meta: {
		authRequired: true
	},
	data() {
		return {
			entries: [],
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
				let res = await this.$axios.$get("entries/unapproved", { params: { page: this.page } });
				this.more = res.more;

				if (append) {
					this.entries = this.entries.concat(res.entries);
				} else {
					this.entries = res.entries;
					this.page = 0;
				}
			} catch (e) {
				if (e.response.status === 401) {
					this.$errorMsg("Du bist nicht mehr eingeloggt");
				} else {
					this.$errorMsg("Fehler beim laden der Einträge");
				}
				return;
			}
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
			
		}
		
	}
}
</script>

<style scoped>
@import "../../css/load-more-button.css";

ul {
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	padding: 0;
}
</style>