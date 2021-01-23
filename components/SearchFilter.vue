<template>

    <div :class="{ 'search-filter': true, expand }">
    
        <div class="bar" @click="expand = !expand">
            
            <span>
                <ChevronRightIcon></ChevronRightIcon>
            </span>
            
            <b>Spezifische Filter</b>
            
        </div>
        
        <div class="filter">
        
            <Form @submit="apply">
                
                <select v-if="$store.state.isMobile" name="type" v-on:click="updateType">
                    
                    <option v-for="(val, key) in typeMapping" :key="key" :value="key">{{ val }}</option>

                </select>

                <fieldset v-else class="radio-buttons" v-on:click="updateType">
                    <legend>Kategorien</legend>

                    <Button v-for="(val, key) in typeMapping" :key="key" :value="key" light center radio name="type">{{ val }}</Button>
                    
                </fieldset>
                
                <fieldset v-if="offerMapping[selectedType] || attributeMapping[selectedType]" class="offers" >
                    <legend>Angebote</legend>

                    <Button v-for="(val, key) in offerMapping[selectedType]" :key="key" :value="key" name="offers" light center checkbox compact>{{ val }}</Button>
                    <Button v-for="(val, key) in attributeMapping[selectedType]" :key="key" :value="key" name="attributes" light checkbox compact>{{ val }}</Button>
                </fieldset>

                <Button center v-on:click="highlightButton = false" class="applyButton" :class="highlightButton ? 'highlight' : ''">
                    Anwenden
                </Button>
            </Form>
            
        </div>
    
    </div>

</template>

<script>
import Form from "@/components/utils/Form";
import Button from "@/components/utils/Button";
import {ChevronRightIcon, MapPinIcon} from "vue-feather-icons";
import EntryMixin from "@/mixins/entry";

export default {
    name: "SearchFilter",
    components: {Button, Form, ChevronRightIcon, MapPinIcon},
    mixins: [EntryMixin],
    data() {
        return {
            expand: true,
            offset: 56,
            listenerActive: false,
            selectedType: "",
            highlightButton: false
        }
    },
    mounted() {
        this.updateFormValues();

        this.activateListener();
    },
    computed: {

        // wrap state as computed, to make it watchable
        isMobile() {
            return this.$store.state.isMobile;
        }

    },
    watch: {

        isMobile (mobile) {
            this.updateFormVisual();
            

            if (mobile) {
                this.deactivateListener();
            } else {
                this.activateListener();
            }
        },

        $route() {
            this.updateType();
        }

    },
    destroyed() {
        this.deactivateListener();
    },
    methods: {
        
        apply: function(form) {
            this.$emit("apply", form);
        },

        updateFormValues() {
            let typeVal = this.$route.query.type;

            // XSS safeguard
            if (this.typeMapping[typeVal ?? ""] === undefined) return;

            this.selectedType = typeVal;
            this.highlightButton = false;

            this.updateFormVisual();
        },

        async updateFormVisual() {
            await this.$nextTick();

            let typeInput = this.$el.querySelector("select, fieldset");

            if (!typeInput) return;

            if (typeInput.tagName === "SELECT") {
                typeInput.value = this.selectedType ?? "";
            } else {
                let btn = typeInput.querySelector(`input${this.selectedType ? `[value=${this.selectedType}]` : '' }`);

                if (btn) {
                    btn.checked = true;
                }

            }
        },

        async updateType() {
            this.selectedType = document.querySelector('input[name=type]:checked, select[name=type]')?.value ?? "";

            if (this.selectedType !== (this.$route.query.type ?? "")) {
                this.highlightButton = true;
            } else {
                this.highlightButton = false;
            }
        },

        activateListener() {

            if (!this.listenerActive) {
                this.$addScrollEvent(this.scrollEvent);              
                this.listenerActive = true;
                this.lastScroll = pageYOffset;
                this.scrollEvent(window.scrollY, 0);

                console.log("Listener activated");
            }

        },

        deactivateListener() {

            this.$removeScrollEvent(this.scrollEvent);
            this.listenerActive = false;
            this.$el.style.top = '';

            console.log("Listener deactivated");

        },

        // if the browser window is too short, we might overflow
        // to counter this, allow the user to scroll an overflowing SearchFilter
        scrollEvent(pos, dist) {

            const offsetHeight = this.$el.offsetHeight;

            const topOffset = 56;

            let botOffset = window.innerHeight - offsetHeight;
            if (botOffset > topOffset) botOffset = topOffset;

            let newOffset = this.offset - dist;
            if (newOffset > topOffset) newOffset = topOffset;
            if (newOffset < botOffset) newOffset = botOffset;

            this.offset = newOffset;

            this.$el.style.top = newOffset + "px";

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

@keyframes collapse-filters {
    0% {
        height: auto;
    }
    100% {
        height: 0;
    }
}

fieldset {
    margin: 4px;
    border: 0;
}

.offers {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.offers >>> .button {
    margin: 2px;
}

.radio-buttons >>> .button {
    border-radius: 0px;
}

.radio-buttons label:first-of-type >>> .button {
    border-radius: 8px 8px 0 0;
}

.radio-buttons label:last-of-type >>> .button {
    border-radius: 0 0 8px 8px;
}

.search-filter.expand > .filter {
    opacity: 1;
    height: auto;
}

.search-filter .feather {
    transition: 0.2s ease transform;
    margin-right: 5px;
}

.search-filter.expand .feather {
    transform: rotate(90deg);
}

.highlight {
    background-color: var(--color-highlight);
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.1);
}

.highlight:hover {
    background-color: var(--color-highlight-accent);
}

@media only screen and (max-width: 720px) {
    .search-filter button {
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