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
    watch: {

        // When location text is set by user, but not used in query, emit a search event, appending the location
        $route(to, from) {
            if (this.locText !== ""
                && to.name === "search"
                && from.name !== "search"
            ) {
                this.$emit("search", { location: this.locText });
            }
        }

    },
    methods: {
        
        search() {
            
            if ( this.locText.length < 2) {
                this.resetLocaction();
                return;
            };
            
            this.$emit("search", { location: this.locText });
        },
        
        distanceSearch() {
    
            navigator.geolocation.getCurrentPosition((pos) => {
                this.$emit("search", { lat: pos.coords.latitude, long: pos.coords.longitude });
            }, (error) => {
                this.resetLocaction();
            });
            
        },

        /** Resets the location, and routes to the search page */
        resetLocaction() {

            let query = {};

            if (this.$route.name === "search") {

                query = {...this.$route.query};

                delete query.location;
                delete query.lat;
                delete query.long;
            }

            this.$router.push({ name: "search", query });

        }
        
    }
}
</script>

<style scoped>

* {
    --button-icononly-width: 38px;
}

.search-bar {
    background-color: var(--color-search-bar);
    border-radius: 4px;
    padding: 5px;
    display: grid;
    width: calc(100% - 80px);
    max-width: 560px;
    min-width: min(240px, 100vw);
    overflow: hidden;
    box-shadow: 1px 1.2px 4px var(--color-box-shadow-strong), 2px 2.5px 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
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
    background-color: transparent;
    border: 0;
    margin: 0;
    font-size: 18px;
    outline: 0;
    padding: 0 0 0 10px;
    min-width: 0;
    font-family: 'Poppins', sans-serif;
    color: var(--color-text);
}

.search-bar > input::placeholder {
    color: var(--color-input-placeholder);
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