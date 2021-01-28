<template>
    
    <div :class="{ 'search-bar': true, hide: hide }" >
    
        <input type="text" :placeholder="$store.state.isMobile ? mobilePlaceholder : placeholder" @keypress.enter="search" :value="this.$route.query.location" />
        
            <MapPinIcon />
            <span class="hide-on-mobile">Umgebungssuche</span>
        </Button>
        
    </div>
    
</template>

<script>
import Button from "@/components/utils/Button";
import {MapPinIcon} from "vue-feather-icons";

export default {
    name: "SearchBar",
    components: {Button, MapPinIcon},
    props: {
        placeholder: String,
        mobilePlaceholder: String,
        hide: Boolean
    },
    methods: {
        
        search: function(event) {
            
            if (event.target.value.length < 2) return;
            
            this.$emit("search", { location: event.target.value });
        },
        
        distanceSearch: function () {
    
            navigator.geolocation.getCurrentPosition((pos) => {
                this.$emit("search", { lat: pos.coords.latitude, long: pos.coords.longitude });
            });
            
        }
        
    }
}
</script>

<style scoped>

.search-bar {
    background-color: white;
    border-radius: 4px;
    padding: 5px;
    display: grid;
    width: calc(100% - 80px);
    max-width: 560px;
    min-width: min(240px, 100vw);
    grid-template-columns: 1fr auto;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
}

.search-bar > button {
    transition: 0.2s ease all;
    width: fit-content;
}

.search-bar > input {
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    margin: 0;
    font-size: 18px;
    outline: 0;
    padding: 0px 10px;
    min-width: 0;
    font-family: 'Poppins', sans-serif;
    color: #334450;
}

.search-bar > input::placeholder {
    color: #0000004C;
    font-weight: 500;
}

.search-bar > button {
    overflow: hidden;
}

@media only screen and (max-width: 720px) {
    
    .hide-on-mobile {
        display: none;
    }

    .search-bar {
        max-width: 400px;
    }
    
}

</style>