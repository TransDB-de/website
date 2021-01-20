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
                
                <select name="type">
                    <option value="">Alle Kategorien</option>
                    <option value="group">Gruppe/Verein</option>
                    <option value="therapist">Therapeut*in/Psychiater*in</option>
                    <option value="endocrinologist">Endokrinologische Praxis</option>
                    <option value="surgeon">Operateur*in</option>
                    <option value="logopedics">Logopäd*in</option>
                    <option value="hairremoval">Haarentfernungsstudio</option>
                </select>
                
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

export default {
    name: "SearchFilter",
    components: {Button, Form, ChevronRightIcon, MapPinIcon},
    data() {
        return {
            expand: true
        }
    },
    methods: {
        
        apply: function(form) {
            this.$emit("apply", form);
        }
        
    }
}
</script>

<style scoped>

.search-filter {
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    position: sticky;
    height: auto;
    align-self: start;
    top: 72px;
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