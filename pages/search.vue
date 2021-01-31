<template>
    
    <div class="search-container">
        
        <SearchFilter @apply="applyFilter" :location="locationName"></SearchFilter>
        
        <div class="entry-container">
            
            <Entry v-for="entry of entries" :entry="entry" :key="entry._id"></Entry>
            
            <h3 v-if="entries.length < 1">Leider sind unter deinem Filter keine Einträge vorhanden</h3>
            
            <div class="centered">
                <Button v-if="more" center light @click="loadNextPage">Mehr anzeigen</Button>
            </div>
            
        </div>
        
    </div>
    
</template>

<script>
import Entry from "@/components/Entry";
import SearchFilter from "@/components/SearchFilter";

export default {
    components: {SearchFilter, Entry},
    data() {
        return {
            entries: [],
            locationName: null,
            page: 0,
            more: true
        }
    },
    watchQuery: ["location", "lat", "long", "type", "offers", "attributes", "page", "text"],
    async asyncData({ $axios, query }) {
        
        let res = await $axios.$get("entries", { params: query });
        
        return { entries: res.entries, locationName: res.locationName, more: res.more }
        
    },
    mounted() {
        this.$addScrollEvent(this.onScroll);
    },
    destroyed() {
        this.$removeScrollEvent(this.onScroll);
    },
    methods: {
        
        applyFilter: function (filter) {
            
            if (this.$route.query.lat && this.$route.query.long) {
                filter.lat = this.$route.query.lat;
                filter.long = this.$route.query.long;
            }
            
            if (this.$route.query.location) {
                filter.locaton = this.$route.query.location;
            }
            
            this.$router.push({ name: "search", query: filter });
            
        },
        
        loadNextPage: async function () {
    
            let page = this.page + 1;
            let query = { page, ...this.$route.query };
            
            let res = await this.$axios.$get("entries", { params: query });
            
            this.entries = this.entries.concat(res.entries);
            this.more = res.more;
            this.page = page;
            
        },
        
        onScroll: function(pos) {
            let scrolledHeight = Math.ceil(pos + window.innerHeight);

            // Check if user has scrolled to the bottom of the page
            if(scrolledHeight >= document.body.offsetHeight && pos > 0) {
                this.loadNextPage();
            }
            
        }
        
    }
}
</script>

<style>
.search-container {
    padding: 20px;
    display: grid;
    width: 100%;
    grid-template-columns: minmax(auto, 1fr) minmax(auto, 860px) 1fr;
}

.search-container > .entry-container {
    margin: 0 20px;
}

.entry-container > .centered {
    display: flex;
    justify-content: center;
    position: relative;
}

.entry-container > .centered > button:after, .entry-container > .centered > button:before {
    content: "";
    display: flex;
    position: absolute;
    width: calc(50% - 85px);
    height: 2px;
    background-color: var(--color-light);
    border-radius: 2px;
}

.entry-container > .centered > button:before {
    left: 0;
}

.entry-container > .centered > button:after {
    right: 0;
}

@media only screen and (max-width: 720px) {
    .search-container {
        grid-template-columns: 100%;
        align-self: stretch;
    }

    .search-container > .entry-container {
        margin: 0;
    }
}
</style>
