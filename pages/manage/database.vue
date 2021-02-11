<template>
    <div class="database" v-if="isAdmin">
        <h1>Datenbank Verwaltung</h1>

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

import TextFilter from "@/components/manage/TextFilter";
import EditableEntry from '@/components/manage/EditableEntry';

import { HelpCircleIcon } from 'vue-feather-icons';

export default {
    name: "database",
    components: { TextFilter, EditableEntry, HelpCircleIcon },
    mixins: [ AccountMixin ],
    meta: {
        authRequired: true
    },
    data() {
        return {
            entries: [],
            query: {
                wildcard: [],
                include: [],
                exclude: [],
                arrayIncludes: [],
                arrayExcludes: [],
                compare: {}
            },
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
                return;
            }
        },
        
        filter(query) {
            this.query = query;
            this.loadEntries();
        },

        async fetchGeo(id) {
            await this.$axios.$patch(`entries/${id}/updateGeo`);
        },

        async deleteEntry(id) {
            await this.$axios.$delete(`entries/${id}`);
            this.loadEntries();
        },

        async updateEntry(id, changes) {
            if (Object.keys(changes).length < 1) {
                return;
            }

            await this.$axios.$patch(`entries/${id}/edit`, changes);
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
            
        }
    }
}
</script>

<style scoped>
@import "@/css/load-more-button.css";

.database > .text-filter {
    align-self: center;

    max-width: 1100px;
    width: 100%;
}

.help {
    align-self: center;
    font-family: "Poppins", sans-serif;
    color: var(--color-grey);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.2em;
    margin-top: -28px;
    margin-bottom: 12px;
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
</style>
