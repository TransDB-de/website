<template>
    
    <div class="full-entry">
        
        <div>
            
            <h1>{{ entry.name }}</h1>
            
            <span>
                {{ typeMapping[entry.type] }}
            </span>
            
            <span>
                <b>Person:</b> {{ person }}
            </span>
            
            <span>
                <b>Adresse:</b> {{ address }}
            </span>
            
            <span>
                <b>Email:</b> {{ entry.email }}
            </span>
            
            <span>
                <b>Webseite:</b> <a>{{ entry.webseite ? entry.website : 'Nicht angegeben' }}</a>
            </span>
            
            <span>
                <b>Telefon:</b> {{ entry.telephone ? entry.telephone : 'Nicht angegeben' }}
            </span>
            
            <span>
                <b>Angebote:</b> {{ offers }}
            </span>
            
            <span>
                <b>Attribute:</b> {{ attributes }}
            </span>
            
            <span>
                <b>Fachrichtung:</b> {{ entry.meta.subject ? subjectMapping[entry.meta.subject] : 'Nicht angegeben' }}
            </span>
            
            <span>
                <b>Besonderheiten:</b> {{ entry.meta.specials ? entry.meta.specials : 'Nicht angegeben' }}
            </span>
            
            <span>
                <b>Mindestalter:</b> {{ entry.meta.minAge ? entry.meta.minAge : 'Nicht angegeben' }}
            </span>
            
            <span>
                <b>Geodaten:</b> {{ entry.location ? 'Ja' : 'Nein' }}
            </span>
            
        </div>
        
        <div>
        
            <Button center icononly title="Freischalten" @click="approve" :loading="approveLoading">
                <check-icon />
            </Button>
            <Button color="red" center icononly title="Löschen" @click="remove" :loading="deleteLoading">
                <trash-icon />
            </Button>
            
        </div>
        
    </div>
    
</template>

<script>
import EntryMixin from "@/mixins/entry";
import Button from "@/components/utils/Button";
import { TrashIcon, CheckIcon } from "vue-feather-icons";

export default {
    name: "FullEntry",
    components: {Button, TrashIcon, CheckIcon},
    mixins: [EntryMixin],
    props: {
        entry: Object
    },
    computed: {
        
        person: function () {
            if(this.entry.firstName || this.entry.lastName) {
                return this.entry.firstName + " " + this.entry.lastName;
            } else {
                return "Nicht angegeben"
            }
        },
        address: function () {
            return `${this.entry.address.street} ${this.entry.address.house}, ${this.entry.address.plz} ${this.entry.address.city}`;
        },
        attributes: function () {
            
            if(this.entry.meta.attributes) {
                
                return this.entry.meta.attributes.map((a) => this.attributeMapping[entry.type][a]).join(", ");
                
            } else {
                return "Nicht angegeben";
            }
            
        },
        offers: function () {
            
            if(this.entry.meta.offers) {
                
                return this.entry.meta.offers.map((a) => this.offerMapping[entry.type][a]).join(", ");
                
            } else {
                return "Nicht angegeben";
            }
            
        }
        
    },
    data() {
        return {
            approveLoading: false,
            deleteLoading: false
        }
    },
    methods: {
        
        approve: async function () {
            
            this.approveLoading = true;
            
            try {
                await this.$axios.$patch("entries/" + this.entry._id + "/approve");
            } catch (e) {
                return;
            }
            
            this.approveLoading = false;
    
            this.$emit("removed", this.entry._id);
            
        },
        
        remove: async function() {
            
            let sure = confirm("Soll dieser Eintrag wirklich gelöscht werden?");
        
            if(!sure) return;
            
            this.deleteLoading = true;
        
            try {
                await this.$axios.$delete("entries/" + this.user._id);
            } catch (e) {
                return;
            }
        
            this.deleteLoading = false;
            
            this.$emit("removed", this.user._id);
        
        }
        
    }
}
</script>

<style scoped>
.full-entry {
    display: flex;
    background-color: white;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 10px 10px 20px;
    margin-bottom: 20px;
    word-break: break-word;
}

.full-entry h1 {
    font-size: 24px;
    margin: 0;
    font-weight: 700;
}

.full-entry > div {
    display: flex;
    flex-direction: column;
}
.full-entry > div:first-child {
    flex-grow: 1;
}

.full-entry > div button {
    margin-bottom: 10px;
}
</style>