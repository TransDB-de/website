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

.search-filter.expand > .filter {
    opacity: 1;
}

.search-filter .feather {
    transition: 0.2s ease transform;
    margin-right: 5px;
}

.search-filter.expand .feather {
    transform: rotate(90deg);
}
</style>