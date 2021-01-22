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
                
                <select v-if="$store.state.isMobile" name="type" v-on: >
                    <option value="">Alle Kategorien</option>
                    <option value="group">Gruppe/Verein</option>
                    <option value="therapist">Therapeut*in/Psychiater*in</option>
                    <option value="endocrinologist">Endokrinologische Praxis</option>
                    <option value="surgeon">Operateur*in</option>
                    <option value="logopedics">Logopäd*in</option>
                    <option value="hairremoval">Haarentfernungsstudio</option>
                </select>

                <fieldset class="radio-buttons" v-else>
                    <legend>Kategorien</legend>

                    <Button light center radio="type" value="">Alle Kategorien</Button>
                    <Button light center radio="type" value="group">Gruppe/Verein</Button>
                    <Button light center radio="type" value="therapist">Therapeut*in/Psychiater*in</Button>
                    <Button light center radio="type" value="endocrinologist">Endokrinologische Praxis</Button>
                    <Button light center radio="type" value="surgeon">Operateur*in</Button>
                    <Button light center radio="type" value="logopedics">Logopäd*in</Button>
                    <Button light center radio="type" value="hairremoval">Haarentfernungsstudio</Button>
                    
                </fieldset>
                
                <Button center>
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
            listenerActive: false
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
            this.updateFormValues();

            if (mobile) {
                this.deactivateListener();
            } else {
                this.activateListener();
            }
        }

    },
    destroyed() {
        this.deactivateListener();
    },
    methods: {
        
        apply: function(form) {
            this.$emit("apply", form);
        },

        async updateFormValues() {
            let typeVal = this.$route.query.type;

            await this.$nextTick();

            let typeInput = this.$el.querySelector("select, fieldset");

            if (!typeInput) return;

            // XSS safeguard
            if (this.typeMapping[typeVal ?? ""] === undefined) return;

            if (typeInput.tagName === "SELECT") {
                typeInput.value = typeVal ?? "";
            } else {
                let btn = typeInput.querySelector(`input${typeVal ? `[value=${typeVal}]` : '' }`);

                if (btn) {
                    btn.checked = true;
                }

            }

        },

        activateListener() {

            if (!this.listenerActive) {
                this.$addScrollEvent(this.scroll);              
                this.listenerActive = true;
                this.lastScroll = pageYOffset;
                scroll();

                console.log("Listener activated");
            }

        },

        deactivateListener() {

            this.$removeScrollEvent(this.scroll);
            this.listenerActive = false;
            this.$el.style.top = '';

            console.log("Listener deactivated");

        },

        // if the browser window is too short, we might overflow
        // to counter this, allow the user to scroll an overflowing SearchFilter
        scroll(pos, dist) {

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
    display: flex;
    flex-direction: column;
    height: auto;
    align-self: start;
    position: sticky;
}

.search-filter > .bar {
    display: flex;
    cursor: pointer;
    user-select: none;
}

.search-filter > .filter {
    opacity: 0;
    transition: 0.2s ease all;
    overflow: hidden;
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

@media only screen and (max-width: 720px) {
    .search-filter button {
        align-self: center;
        width: 80%;
        min-width: min-content;
    }

    .search-filter {
        position: relative;
        top: 0;
    }
}

</style>