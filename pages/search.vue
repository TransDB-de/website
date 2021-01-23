<template>
    
    <div class="search-container">
        
        <SearchFilter @apply="applyFilter" :location="locationName"></SearchFilter>
        
        <div class="entry-container">
            
            <Entry v-for="entry of entries" :entry="entry" :key="entry._id"></Entry>
            
            <h3 v-if="entries.length < 1">Leider sind unter deinem Filter keine Einträge vorhanden</h3>
            
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
            locationName: null
        }
    },
    watchQuery: ["location", "lat", "long", "type"],
    async asyncData({ $axios, query }) {
        
        let res = await $axios.$get("entries", { params: query  });
        return { entries: res.entries, locationName: res.locationName }
        
    },
    methods: {
        
        applyFilter: function (filter) {
            
            if(this.$route.query.lat && this.$route.query.long) {
                filter.lat = this.$route.query.lat;
                filter.long = this.$route.query.long;
            }
            
            if(this.$route.query.location) {
                filter.locaton = this.$route.query.location;
            }
            
            this.$router.push({ name: "search", query: filter });
            
        }
        
    }
}
</script>

<style>
.search-container {
    padding: 20px;
    display: grid;
    grid-template-columns: minmax(auto, 1fr) auto 1fr;
}

.search-container > .entry-container {
    margin: 0 20px;
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
