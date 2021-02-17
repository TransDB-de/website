<template>

    <div class="entry">
    
        <h1>{{ entry.name }}</h1>
        
        <p class="inline-content">
            <b>{{ entry.firstName }} {{ entry.lastName }}</b>
            <span v-if="subjectMapping[entry.type]" :title="mouseOverTexts[entry.type]">{{ subjectMapping[entry.type][entry.meta.subject] }}</span>
            <span v-else :title="mouseOverTexts[entry.type]">{{ typeMapping[entry.type] }}</span>
        </p>
        
        <p>
            
            <a :href="`https://www.google.de/maps/search/${address}`" target="_blank">
                <map-icon />{{ address }}
            </a>
    
            <span v-if="entry.telephone">
                <phone-icon />{{ entry.telephone }}
            </span>
            
            <a :href="`mailto:${entry.email}`">
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
        
    </div>
    
</template>

<script>
import Tag from "@/components/utils/Tag";
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";
import { MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon } from "vue-feather-icons";

export default {
    name: "FullEntry",
    components: { Tag, MapIcon, MailIcon, GlobeIcon, PhoneIcon, NavigationIcon },
    mixins: [ EntryMixin, MouseoverMixin ],
    props: {
        entry: Object
    },
    computed: {
        address: function () {
            return `${this.entry.address.street} ${this.entry.address.house}, ${this.entry.address.plz} ${this.entry.address.city}`;
        },
        website: function () {
            return new URL(this.entry.website).host;
        }
    }
}
</script>

<style scoped>

.entry {
    display: flex;
    flex-direction: column;
    background-color: var(--color-entry);
    box-shadow: 1px 1px 6px var(--color-box-shadow);
    border-radius: 4px;
    padding: 10px 20px;
    margin-bottom: 20px;
}

.entry > h1 {
    font-size: 26px;
    margin: 0;
    font-weight: 600;
}

.entry > p {
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
}

.entry > p:last-child {
    margin-bottom: 5px;
}

.entry > p > span:not(.tag), .entry > p > a {
    color: var(--color-entry-details);
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
    text-decoration: none;
}

.entry > p > span.tag {
    margin: 2.5px;
}

.entry > p > span:last-child, .entry > p > span.tag:last-child {
    margin-right: 0;
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

.entry > p > span .feather, .entry > p > a .feather {
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

</style>