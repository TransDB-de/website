<template>
	<div class="entry-page">
		<h1 v-if="entry">
			<span class="line">{{entry.name}}</span>
			<span class="line"> - aus {{entry.address.city}}</span>
		</h1>
		<Entry v-if="entry" :entry="entry" />
		
		<h1 v-if="!entry">Link nicht gefunden</h1>
		<h2 v-if="!entry">Leider konnten wir unter diesem Link keinen Eintrag finden.</h2>
		
		<Button class="button-search" v-if="entry" @click="click" :title="mouseOverTexts['searchNearbyButton']">
			Mehr Angebote in dieser Gegend
		</Button>
	</div>
</template>

<script>
import Entry from "../../components/Entry";
import Button from "../../components/utils/Button";
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";

export default {
	components: {Button, Entry},
	mixins: [EntryMixin, MouseoverMixin],
	data() {
		return {
			entry: null
		}
	},
	async asyncData({params, $axios}) {
		if (!params.entry) return;
		let entry = null;
		
		try {
			entry = await $axios.$get("entries/" + params.entry);
		} catch (e) {}
		
		return {entry};
	},
	methods: {
		click() {
			let query = {};

			if (this.entry) {
				if (this.entry.location) {
					query.lat = this.entry.location.coordinates[0];
					query.long = this.entry.location.coordinates[1];
				} else if (this.entry.address.city) {
					query.location = this.entry.address.city
				}
			}

			this.$router.push({ name: "search", query });
		}
	}
}
</script>

<style scoped>
.entry-page {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin: 20px;
	flex-grow: 1;
	text-align: center;
	max-width: 860px;
	width: calc(100% - 40px);
}

.entry-page button {
	max-width: 320px;
	align-self: center;
}

.entry-page h1 {
	margin: 20px 0;
	text-align: left;
	padding-bottom: 5px;
	border-bottom: 3px solid var(--color-light);
}

.entry-page .line {
	display: inline-block;
}

.entry-page .button-search {
	padding: 4px 12px;
	min-height: 40px;
	height: unset;
}
</style>