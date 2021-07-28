<template>

	<div class="entry">

		<div class="no-margin">
			<h1>{{ entry.name }}</h1>

			<span v-if="entry.accessible === 'yes'" class="special highlight" :title="mouseOverTexts['barrierFree']">
				<CheckCircleIcon /> Barrierefrei
			</span>

			<span v-if="entry.accessible === 'no'" class="special warn" :title="mouseOverTexts['notBarrierFree']">
				<AlertTriangleIcon /> Nicht Barrierefrei
			</span>
		</div>

		<p class="inline-content">
			<b>{{ entry.firstName }} {{ entry.lastName }}</b>
			<span v-if="subjectMapping[entry.type]" :title="mouseOverTexts[entry.type]">{{ subjectMapping[entry.type][entry.meta.subject] }}</span>
			<span v-else :title="mouseOverTexts[entry.type]">{{ typeMapping[entry.type] }}</span>
		</p>
		
		<p>
			
			<a :href="`https://www.google.de/maps/search/${address}`" target="_blank">
				<map-icon />{{ address }}
			</a>
	
			<a v-if="entry.telephone" :href="`tel:${entry.telephone}`">
				<phone-icon />{{ entry.telephone }}
			</a>
			
			<a v-if="entry.email" :href="`mailto:${entry.email}`">
				<mail-icon />{{ entry.email }}
			</a>
			
			<a v-if="entry.website" :href="entry.website" target="_blank">
				<globe-icon />{{ website }}
			</a>
			
		</p>
		
		<p v-if="entry.meta.offers">
			<b>Angebote:</b> <Tag v-for="offer of entry.meta.offers" :key="offer" :title="mouseOverTexts[offer]">{{ offerMapping[entry.type][offer] }}</Tag>
		</p>
		
		<p v-if="entry.meta.attributes">
			<b>Bietet:</b> <Tag v-for="attr of entry.meta.attributes" :key="attr" :title="mouseOverTexts[attr]">{{ attributeMapping[entry.type][attr] }}</Tag>
		</p>
		
		<p v-if="entry.meta.specials">
			<b>Besonderheiten:</b>{{ entry.meta.specials }}
		</p>
		
		<p v-if="entry.distance" class="nav" :title="mouseOverTexts['distance']">
			<span>
				<NavigationIcon /> <b>{{ Math.round(entry.distance) }} km</b>
			</span>
		</p>
		
		<button class="meta-button" @click="report" title="Eintrag melden oder Änderung vorschlagen">
			<EditIcon />
		</button>
		
	</div>
	
</template>

<script>
import Tag from "@/components/utils/Tag";
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";
import { MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon, CheckCircleIcon, AlertTriangleIcon, EditIcon } from "vue-feather-icons";
import entry from "@/mixins/entry";

export default {
	name: "Entry",
	components: { Tag, MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon, CheckCircleIcon, AlertTriangleIcon, EditIcon },
	mixins: [ EntryMixin, MouseoverMixin ],
	props: {
		entry: Object
	},
	computed: {
		address: function () {
			let addr = "";
			
			if (this.entry.address.street) addr += this.entry.address.street + " ";
			if (this.entry.address.house) addr += this.entry.address.house + ", ";
			if (this.entry.address.plz) addr += this.entry.address.plz + " ";
			
			addr += this.entry.address.city;
			
			return addr;
		},
		website: function () {
			return new URL(this.entry.website).host;
		}
	},
	methods: {
		report() {
			this.$router.push({ name: "report", query: { id: this.entry._id } })
		}
	}
}
</script>

<style scoped>

.entry {
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: var(--color-entry);
	box-shadow: 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	border-radius: 4px;
	padding: 10px 20px;
	margin-bottom: 20px;
}

.entry h1 {
	font-size: 26px;
	margin: 0;
	font-weight: 600;
}

.entry > p,
.entry > div {
	font-size: 16px;
	display: flex;
	flex-wrap: wrap;
	margin-top: 0;
}

.entry > .no-margin {
	margin: 0;
}

.entry > p:last-child {
	margin-bottom: 5px;
}

.entry > p > span:not(.tag):not(.heading),
.entry > p > a,
.entry > div > span {
	color: var(--color-entry-details);
	display: flex;
	align-items: flex-start;
	margin-right: 20px;
	text-decoration: none;
	padding: 5px 0;
}

.entry > p > span.tag {
	margin: 2.5px;
}

.entry > p > span:last-child,
.entry > div > span:last-child,
.entry > p > span.tag:last-child {
	margin-right: 0;
}

.entry > div > h1 {
	margin-right: 10px;
}

.entry b {
	font-weight: 500;
}

.entry > p > b {
	margin-right: 5px;
	display: inline-flex;
	align-items: center;
}

.entry > p.inline-content > span {
	margin-left: 5px;
}

.entry > p > span .feather,
.entry > p > a .feather {
	margin-right: 5px;
	height: 18px;
	width: 18px;
	min-width: 18px;
}

.entry > p > a:hover {
	text-decoration: underline solid var(--color-entry-link-underline);
}

.entry > .nav {
	user-select: none;
}

.entry > div > .special {
	padding: 4px 6px 4px 4px !important;
	font-size: 13px;
	border-radius: 4px;
	height: min-content;
	align-self: center;
	cursor: default;
}

.entry > div > .special .feather {
	width: 16px;
	height: 16px;
	margin-right: 2px;
}

.entry > div > .highlight {
	background-color: var(--color-special-highlight);
}

.entry > div > .warn {
	background-color: var(--color-special-warn);
}

.entry .meta-button {
	position: absolute;
	opacity: 0;
	visibility: hidden;
	top: 15px;
	right: 15px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	color: var(--color-light-accent);
	transition: 0.2s ease color, 0.2s ease opacity;
}

.entry:hover .meta-button {
	visibility: visible;
	opacity: 1;
}

.entry .meta-button:hover {
	color: var(--color-text);
}

@media only screen and (max-width: 720px) {
	.entry:hover .meta-button {
		color: var(--color-text);
	}
}
</style>