<template>

	<div class="entry">

		<div class="flex medium-gap reverse no-bottom-gap">
			<h1>{{ entry.name }}</h1>

			<span v-if="entry.accessible === 'yes'" class="special highlight flex tiny-gap" :title="mouseOverTexts['barrierFree']">
				<CheckCircleIcon /> Barrierefrei
			</span>

			<span v-if="entry.accessible === 'no'" class="special warn flex tiny-gap" :title="mouseOverTexts['notBarrierFree']">
				<AlertTriangleIcon /> Nicht Barrierefrei
			</span>
			
			<div class="meta-button-container medium-gap">
				<button class="meta-button" @click="report" title="Eintrag melden oder Änderung vorschlagen">
					<EditIcon />
				</button>
	
				<button class="meta-button" @click="share" title="Teile den Link zu diesem Eintrag">
					<Share2Icon />
				</button>
			</div>
		</div>

		<p class="flex small-gap tab">
			<b>{{ entry.firstName }} {{ entry.lastName }}</b>
			<span v-if="subjectMapping[entry.type]" :title="mouseOverTexts[entry.type]">{{ subjectMapping[entry.type][entry.meta.subject] }}</span>
			<span v-else :title="mouseOverTexts[entry.type]">{{ typeMapping[entry.type] }}</span>
		</p>
		
		<p class="flex large-gap">
			
			<a :href="`https://www.google.de/maps/search/${address}`" target="_blank" class="flex small-gap no-wrap">
				<MapIcon />{{ address }}
			</a>
	
			<a v-if="entry.telephone" :href="`tel:${entry.telephone}`" class="flex small-gap no-wrap">
				<PhoneIcon />{{ entry.telephone }}
			</a>
			
			<a v-if="entry.email" :href="`mailto:${entry.email}`" class="flex small-gap no-wrap">
				<MailIcon />{{ entry.email }}
			</a>
			
			<a v-if="entry.website" :href="entry.website" target="_blank" class="flex small-gap no-wrap">
				<GlobeIcon />{{ website }}
			</a>
			
		</p>
		
		<p v-if="entry.meta.offers" class="flex small-gap">
			<b>Angebote:</b> <Tag v-for="offer of entry.meta.offers" :key="offer" :title="mouseOverTexts[offer]">{{ offerMapping[entry.type][offer] }}</Tag>
		</p>
		
		<p v-if="entry.meta.attributes" class="flex small-gap">
			<b>Bietet:</b> <Tag v-for="attr of entry.meta.attributes" :key="attr" :title="mouseOverTexts[attr]">{{ attributeMapping[entry.type][attr] }}</Tag>
		</p>
		
		<p v-if="entry.meta.specials" class="flex small-gap">
			<b>Besonderheiten:</b>{{ entry.meta.specials }}
		</p>
		
		<p v-if="entry.distance" class="nav no-select" :title="mouseOverTexts['distance']">
			<span>
				<NavigationIcon /> <b>{{ Math.round(entry.distance) }} km</b>
			</span>
		</p>
		
	</div>
	
</template>

<script>
import Tag from "@/components/utils/Tag";
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";
import { MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon, CheckCircleIcon, AlertTriangleIcon, EditIcon, Share2Icon } from "vue-feather-icons";

export default {
	name: "Entry",
	components: { Tag, MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon, CheckCircleIcon, AlertTriangleIcon, EditIcon, Share2Icon },
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
			this.$router.push({ name: "report", query: { id: this.entry._id } });
		},
		share() {
			let url = "/entry/" + this.entry._id;

			if (navigator.share) {
				navigator.share({ url });
			} else {
				navigator.clipboard.writeText(window.location.origin + url);
				this.$okMsg("Link in die Zwischenablage kopiert!");
			}
		}
	}
}
</script>

<style scoped>
/** --- General Looks --- */
.entry {
	background-color: var(--color-entry);
	box-shadow: 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	border-radius: 4px;
	padding: 10px 20px;
}

.entry h1 {
	font-size: 26px;
	font-weight: 600;
}

.entry a {
	color: var(--color-entry-details);
	text-decoration: none;
	padding: 5px 0;
	overflow-wrap: anywhere;
}

.entry a:hover {
	text-decoration: underline solid var(--color-entry-link-underline);
}

.entry b {
	font-weight: 500;
}

.entry * {
	overflow-wrap: break-word;
	min-width: 0;
}

/** --- General Layout --- */
.entry h1,
.entry p {
	margin-top: 0;
	margin-bottom: 0;
}

.entry {
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 20px;
}

.entry > p,
.entry > div {
	margin-bottom: 1em;
}

.entry :last-child {
	margin-bottom: 0;
}

.entry .feather {
	height: 18px;
	width: 18px;
	min-width: 18px;
}

/** --- Classes --- */
.entry .special {
	padding: 4px 6px 4px 4px;
	font-size: 13px;
	border-radius: 4px;
	height: min-content;
	align-self: center;
	cursor: default;
}

.entry .special .feather {
	width: 16px;
	height: 16px;
}

.entry .highlight {
	background-color: var(--color-special-highlight);
}

.entry .warn {
	background-color: var(--color-special-warn);
}

.entry .no-select {
	user-select: none;
}

.entry .flex {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	row-gap: 2.5px;
}

.entry .reverse {
	flex-wrap: wrap-reverse;
}

.entry .large-gap {
	column-gap: 20px;
}

.entry .medium-gap {
	column-gap: 10px;
}

.entry .small-gap {
	column-gap: 5px;
}

.entry .tiny-gap {
	column-gap: 2.5px;
}

.entry .no-wrap {
	flex-wrap: nowrap;
}

.entry .no-bottom-gap {
	margin-bottom: 0;
}

.entry .tab {
	margin-left: 5px;
}

/** --- Unique Class --- */
.entry .meta-button {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	color: var(--color-light-accent);
	transition: 0.2s ease color;
}

.entry .meta-button-container {
	display: flex;
	margin-left: auto;
}

.entry .meta-button .feather {
	width: 1.8em;
	height: 1.8em;
}

.entry:hover .meta-button {
	color: var(--color-light-active);
}

.entry .meta-button:hover {
	color: var(--color-text);
}

/** --- Mobile Adjustments --- */
@media only screen and (max-width: 360px) {
	.entry {
		padding: 6px 12px;
	}
}

</style>