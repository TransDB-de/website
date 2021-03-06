<template>
    
    <div :class="{ 'search-bar': true, hide: hide, 'text-search': hasText }" >
    
        <input type="text"
            :title="mouseOverTexts['locationSearch']"
            :placeholder="$store.state.isMobile ? mobilePlaceholder : placeholder"
            @keypress.enter="search"
            v-model="locText"
        />
        


        <Button light @click="distanceSearch" :title="mouseOverTexts['proximitySearch']" class="proximity-button" >
            <MapPinIcon />
            <span class="hide-on-mobile">Umgebungssuche</span>
        </Button>
        
        <Button light icononly @click="search" :title="mouseOverTexts['locationSearchButton']" class="search-button" :class="hasText ? '': 'collapsed'" >
            <SearchIcon />
        </Button>
        
    </div>
    
</template>

<script>
import Button from "@/components/utils/Button";
import { MapPinIcon, SearchIcon } from "vue-feather-icons";
import MouseoverMixin from "@/mixins/mouseover";

export default {
    name: "SearchBar",
    components: { Button, MapPinIcon, SearchIcon },
    mixins: [ MouseoverMixin ],
    props: {
        placeholder: String,
        mobilePlaceholder: String,
        hide: Boolean
    },
    data() {
        return {
            locText: ""
        }
    },
    mounted() {
        this.locText = this.$route.query.location ?? '';
    },
    computed: {
        hasText() {
            return this.locText.length > 0;
        }
    },
    methods: {
        
        search: function() {
            
            if ( this.locText.length < 2) {
                this.$router.push("/search");
                return;
            };
            
            this.$emit("search", { location: this.locText });
        },
        
        distanceSearch: function () {
    
            navigator.geolocation.getCurrentPosition((pos) => {
                this.$emit("search", { lat: pos.coords.latitude, long: pos.coords.longitude });
            }, (error) => {
                this.$router.push("/search");
            });
            
        }
        
    }
}
</script>

<style scoped>

* {
    --button-icononly-width: 38px;
}

.search-bar {
    background-color: white;
    border-radius: 4px;
    padding: 5px;
    display: grid;
    width: calc(100% - 80px);
    max-width: 560px;
    min-width: min(240px, 100vw);
    overflow: hidden;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    grid-template-columns: 1fr auto 0;
    transition: 0.4s ease grid-template-columns;
}

.text-search {
    grid-template-columns: 1fr auto calc(var(--button-icononly-width) + 4px);
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
    padding: 0 0 0 10px;
    min-width: 0;
    font-family: 'Poppins', sans-serif;
    color: #334450;
}

.search-bar > input::placeholder {
    color: #0000004C;
    font-weight: 500;
}

.search-bar > button:not(.collapsed) {
    margin-left: 4px;
}

.collapsed {
    opacity: 0;
}

.search-bar > .proximity-button {
    transition: 0.4s background-color;
}

.search-bar.text-search > .proximity-button {
    background-color: transparent;
}

.search-bar > .search-button:not(.light) {
    height: 35px;
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