<template>

    <div :class="{ 'search-filter': true, expand }" :style="$store.state.isMobile ? '' : `top: ${scrollOffset}px`">
    
        <div class="bar" @click="expand = !expand">
            
            <span>
                <ChevronRightIcon />
            </span>
            
            <b>Spezifische Filter</b>
            
        </div>
        
        <div class="filter">
            
            <h2 v-if="location">Standort</h2>
            <p v-if="location" class="location" :title="mouseOverTexts['location']">
                <MapPinIcon />
                <span>{{ location }}</span>
            </p>
        
            <Form @submit="apply">
                
                <h2>Kategorien</h2>

                <select v-show="$store.state.isMobile" name="type" v-model="selectedType" v-on:click="updateApplyButton" >
                    
                    <option v-for="(val, key) in typeMapping" :key="key" :value="key">{{ val }}</option>

                </select>

                <fieldset v-show="!$store.state.isMobile" class="radio-buttons" v-on:click="updateApplyButton" >

                    <RadioButton name="type"
                        v-for="(val, key) in typeMapping" :key="key"
                        :value="key"
                        :model="selectedType"
                        @change="(newVal) => selectedType = newVal"
                    > {{ val }} </RadioButton>

                </fieldset>
                
                <h2>Textsuche</h2>
                
                <input name="text"
                       v-model.trim="textSearch"
                       @keyup="highlightButton = true"
                       type="text"
                       minlength="2"
                       maxlength="120"
                       placeholder="Suche Namen oder Personen"/>
                
                <h2 v-if="offerMapping[selectedType] || attributeMapping[selectedType]">Angebote</h2>

                <fieldset v-if="offerMapping[selectedType] || attributeMapping[selectedType]" class="offers" v-on:click="updateApplyButton" >

                    <CheckboxButton name="offers[]"
                        v-for="(val, key) in offerMapping[selectedType]" :key="key"
                        :value="key"
                        :model="selectedOffers"
                        :title="mouseOverTexts[key]"
                        @change="(newVal) => selectedOffers = newVal"
                    > {{ val }} </CheckboxButton>

                    <CheckboxButton name="attributes[]"
                        v-for="(val, key) in attributeMapping[selectedType]" :key="key"
                        :value="key"
                        :model="selectedAttributes"
                        :title="mouseOverTexts[key]"
                        @change="(newVal) => selectedAttributes = newVal"
                    > {{ val }} </CheckboxButton>

                </fieldset>

                <Button
                    center
                    v-on:click="highlightButton = false"
                    class="applyButton"
                    :class="highlightButton ? 'highlight' : ''"
                    :loading="loading">
                    Anwenden
                </Button>
            </Form>
            
        </div>
    
    </div>

</template>

<script>
import Form from "@/components/utils/Form";
import Button from "@/components/utils/Button";
import RadioButton from "@/components/utils/RadioButton";
import CheckboxButton from "@/components/utils/CheckboxButton";
import {ChevronRightIcon, MapPinIcon} from "vue-feather-icons";
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";
import MathMixin from "@/mixins/math";

export default {
    name: "SearchFilter",
    components: {
        Button,
        Form,
        ChevronRightIcon,
        MapPinIcon,
        RadioButton,
        CheckboxButton
    },
    mixins: [ EntryMixin, MouseoverMixin, MathMixin ],
    props: {
        location: String,
        loading: Boolean
    },
    data() {
        return {
            expand: true,
            selectedType: "",
            selectedAttributes: Set,
            selectedOffers: Set,
            textSearch: "",
            highlightButton: false,
            scrollOffset: 0
        }
    },
    mounted() {
        this.routeUpdated(this.$route);

        if (!this.$store.state.isMobile) {
            this.$addScrollEvent(this.scrollEvent);
        }
    },
    computed: {

        // wrap state as computed, to make it watchable
        isMobile() {
            return this.$store.state.isMobile;
        }

    },
    watch: {

        isMobile(mobile) {
            if (mobile) {
                this.$removeScrollEvent(this.scrollEvent);
            } else {
                this.$addScrollEvent(this.scrollEvent);
            }
        },

        $route(newRoute) {
            this.routeUpdated(newRoute);
        }

    },
    destroyed() {
        this.$removeScrollEvent(this.scrollEvent);
    },
    methods: {
        routeUpdated(newRoute) {
            let text = newRoute.query.text ?? "";
            let type = newRoute.query.type ?? "";
            let offers = newRoute.query.offers ?? [];
            let attributes = newRoute.query.attributes ?? [];

            offers = (Array.isArray(offers)) ? offers : [offers];
            attributes = (Array.isArray(attributes)) ? attributes : [attributes];

            if (this.typeMapping[type] === undefined) return;
            offers = offers.filter(val => this.offerMapping[type]?.[val] !== undefined);
            attributes = attributes.filter(val => this.attributeMapping[type]?.[val] !== undefined);

            this.textSearch = text;
            this.selectedType = type;
            this.selectedOffers = new Set(offers);
            this.selectedAttributes = new Set(attributes);
        },
        
        apply(form) {
            this.$emit("apply", form);
            this.highlightButton = false;
        },

        updateApplyButton() {
            this.highlightButton = true;            
        },

        // if the browser window is too short, we might overflow
        // to counter this, allow the user to scroll an overflowing SearchFilter
        scrollEvent(pos, dist) {
            const offsetHeight = this.$el.offsetHeight;
            const topOffset = 56;

            let botOffset = Math.min(window.innerHeight - offsetHeight, topOffset);
            let newOffset = this.clamp(this.scrollOffset - dist, botOffset, topOffset);

            this.scrollOffset = newOffset;
        }
        
    }
}
</script>

<style scoped>

.search-filter {
    padding: 16px 0;
    width: min(320px, 30vw);
    min-width: min-content;
    display: flex;
    flex-direction: column;
    height: auto;
    align-self: start;
    position: sticky;
    justify-self: end;
}

.search-filter > .bar {
    display: flex;
    cursor: pointer;
    user-select: none;
    font-family: "Poppins", sans-serif;
}

.search-filter > .filter {
    opacity: 0;
    transition: 0.2s ease all;
}

.search-filter:not(.expand) > .filter {
    animation: collapse-filters;
    animation-fill-mode: forwards;
    animation-delay: 0.2s;
}

.location > .feather {
    color: var(--color-radio-selected);
    stroke-width: 2.5px;
}

.filter {
    padding: 0 10px;
}

.filter p {
    margin: 0;
    display: flex;
    align-items: center;
}

.filter input[type=text] {
    margin-bottom: 10px;
    width: 100%;
    background-color: var(--color-input-background);
}

.filter p .feather {
    height: 21px;
    width: 21px;
}

@keyframes collapse-filters {
    0% {
        height: auto;
    }
    100% {
        height: 0;
    }
}

fieldset {
    margin: 0 0 10px 0;
    padding: 0;
    border: 0;
}

.offers {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.filter h2 {
    font-weight: 500;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    margin: 10px 0 10px 0;
}

.search-filter.expand > .filter {
    opacity: 1;
    height: auto;
}

.search-filter .feather {
    transition: 0.2s ease transform;
    margin-right: 5px;
}

.search-filter.expand > .bar .feather {
    transform: rotate(90deg);
}

.highlight {
    background-color: var(--color-highlight);
}

.highlight:hover {
    background-color: var(--color-highlight-accent);
}

@media only screen and (max-width: 720px) {
    .search-filter > button {
        align-self: center;
        width: 80%;
        min-width: min-content;
    }

    .search-filter {
        width: 100%;
        min-width: 0;
        position: relative;
        top: 0;
    }
}

</style>