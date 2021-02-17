<template>
    <div class="entry" :class="editable ? 'edit' : ''">
        <InlineTextField v-model="_entry.name" :editable="editable" heading="Name" class="col-1-2"/>
        <InlineSelectField v-model="_entry.type" :mapping="typeMappingData" :editable="editable" heading="Art" class="col-2-2"/>
        <InlineBooleanField v-model="_entry.approved" :editable="editable" heading="Freigeschaltet" class="no-border col-last row-first"/>

        <div class="segment col-1-2">
            <span>Adresse</span>
            <InlineTextField v-model="_entry.address.street" :editable="editable" heading="Straße" />
            <InlineTextField v-model="_entry.address.house" :editable="editable" heading="Hausnummer"/>
            <InlineTextField v-model="_entry.address.plz" :editable="editable" heading="PLZ"/>
            <InlineTextField v-model="_entry.address.city" :editable="editable" heading="Stadt"/>
            <span v-if="locWarn" class="warn">
                <AlertTriangleIcon />Dieser Eintrag hat keine Geodaten!
                
                <Button v-if="notRefetched && editable" :title="mouseOverTexts['reloadGeo']" @click="fetchGeo">erneut versuchen</Button>
            </span>
        </div>

        <div class="segment col-2-2">
            <span>Kontaktdaten</span>

            <InlineTextField v-model="_entry.firstName" class="half" :editable="editable" heading="Vorname"/>
            <InlineTextField v-model="_entry.lastName" class="half" :editable="editable" heading="Nachname"/>

            <InlineTextField v-model="_entry.website" :editable="editable" heading="Website"/>
            <InlineTextField v-model="_entry.email" :editable="editable" heading="E-Mail" />
            <InlineTextField v-model="_entry.telephone" :editable="editable" heading="Telefonnummer"/>
            <span v-if="infoWarn" class="warn">
                <AlertTriangleIcon />Dieser Eintrag hat keine Kontaktdaten!
            </span>
        </div>

        <InlineRadioList v-model="_entry.meta.attributes" :mapping="attributeMapping[_entry.type]" :editable="editable" heading="Attribute" class="col-1-3" />
        <InlineRadioList v-model="_entry.meta.offers" :mapping="offerMapping[_entry.type]" :editable="editable" heading="Angebote" class="col-2-3" />

        <div class="segment col-3-3">
            <InlineTextField v-model="_entry.meta.specials" :editable="editable" heading="Spezialangebote" />
            <InlineTextField v-model="_entry.meta.minAge" number :editable="editable" heading="Mindestalter" />
            <InlineSelectField v-if="subjectMapping[_entry.type]" v-model="_entry.meta.subject" :mapping="subjectMapping[_entry.type]" :editable="editable" heading="Fachrichtung" class="col-2-2"/>
        </div>

        <div class="buttons no-border">
            <Button v-if="editable" class="double" :title="mouseOverTexts['deleteEntry']" color="red" @click="deleteEntry"> löschen</Button>
            <Button v-if="editable" class="single" :title="mouseOverTexts['discardChanges']" icononly light @click="cancelEdit"> <XIcon /> </Button>
            <Button v-if="editable" class="single" :title="mouseOverTexts['saveChanges']" icononly @click="save"> <SaveIcon /> </Button>
            <Button v-if="!editable" class="single right" :title="mouseOverTexts['editEntry']" icononly light @click="edit"> <EditIcon /> </Button>
        </div>
    </div>	
</template>

<script>
import EntryMixin from "@/mixins/entry";
import MouseoverMixin from "@/mixins/mouseover";

import InlineTextField from "./InlineTextField";
import InlineSelectField from "./InlineSelectField";
import InlineBooleanField from "./InlineBooleanField";
import InlineRadioList from "./InlineRadioList";

import { AlertTriangleIcon, Trash2Icon, EditIcon, SaveIcon, XIcon } from 'vue-feather-icons';

import Button from "@/components/utils/Button";

export default {
    name: "CompactEntry",
    mixins: [ EntryMixin, MouseoverMixin ],
    components: { InlineTextField, InlineSelectField, InlineBooleanField, InlineRadioList,
        AlertTriangleIcon, Trash2Icon, EditIcon, SaveIcon, XIcon,
        Button
    },
    data() {
        return {
            _entry: {},
            editable: false,
            notRefetched: false
        }
    },
    props: {
        entry: Object
    },
    computed: {
        locWarn() {
            return this._entry.approved && !this._entry.location;
        },

        infoWarn() {
            return !this._entry.website &&
                   !this._entry.email &&
                   !this._entry.telephone
        }
    },
    created() {
        this._entry = JSON.parse(JSON.stringify(this.entry));
    },
    methods: {
        edit() {
            this.editable = true;
            this.notRefetched = true;
        },

        cancelEdit() {
            this.editable = false;
            this._entry = JSON.parse(JSON.stringify(this.entry));
        },

        deleteEntry() {
            if (window.confirm(`Bist du sicher, dass du den Eintrag "${this.entry.name}" löschen möchtest?`)) {
                this.$emit("delete", this.entry._id);
            }
        },

        fetchGeo() {
            this.notRefetched = false;
            this.$emit("fetchGeo", this.entry._id);
        },

        save() {
            let changes = this.getObjChanges(this.entry, this._entry);
            
            this.editable = false;

            this.$emit("save", this.entry._id, changes);
        },

        getObjChanges(original, changed) {
            let changes = {};

            for (const [key, val] of Object.entries(original)) {
                if (JSON.stringify(val) !== JSON.stringify(changed[key])) {
                    changes[key] = changed[key]
                }
            }

            return changes;
        }
    }
}
</script>

<style scoped>
.entry {
    display: grid;
    background-color: var(--color-entry);
    box-shadow: 1px 1px 6px var(--color-box-shadow);
    border-radius: 4px;
    padding: 5px 10px;
    margin-bottom: 20px;
    grid-template-columns: 2fr 1fr 1fr 2fr auto;
    column-gap: 8px;
    row-gap: 8px;
}

.col-1-2 {
    grid-column: 1 / 3;
}

.col-2-2 {
    grid-column: 3 / 5;
}

.col-last {
    grid-column: 5 / 6;
}

.col-1-3 {
    grid-column: 1 / 2;
}

.col-2-3 {
    grid-column: 2 / 4;
}

.col-3-3 {
    grid-column: 4 / 5;
}

.entry > * {
    box-shadow: 0 0 4px 0 var(--color-box-shadow);
    border-radius: 4px;
    
    padding: 2px 4px;
}

.no-border {
    box-shadow: none;
}

.segment {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--color-grey);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: start;
    column-gap: 4px;
    row-gap: 4px;
}

.segment > * {
    grid-column: 1 / 3;
}

.segment > .half {
    grid-column: auto / span 1;
}

.segment > .inline-field {
    font-size: 12px;
}

.warn {
    font-weight: 500;
    font-size: 15px;
    color: var(--color-warn);
    margin-top: auto;
    text-align: center;
    user-select: none;
    cursor: default;
}

.warn > .feather {
    display: inline-flex;
    align-self: center;
    width: 1em;
    height: 1em;
    top: 0.15em;
    position: relative;
    margin-right: 4px;
}

.warn > button {
    display: inline-flex;
    color: var(--color-entry);
    font-weight: 500;
    font-size: 13px;
    background-color: var(--color-warn);
    height: auto;
    padding: 0 6px;
}

.buttons {
    grid-column: 5 / 6;
    grid-row: 2 / 5;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto 1fr auto;

    justify-items: right;
    row-gap: 8px;
    column-gap: 8px;
}

.buttons > button {
    height: 40px;
}

.buttons > button:not(.double) {
    grid-row: 3 / 4;
}

.buttons > .double {
    grid-column: 1 / 3;
}

.buttons > .right {
    grid-column: 2 / 3;
}

.buttons > .single {
    width: 40px;
    justify-content: center;
}

.buttons > .single > .feather {
    width: 22px;
    height: 22px;
}

@media only screen and (max-width: 740px) {
    .entry {
        grid-template-columns: 1fr auto;
    }

    .col-1-2 {
        grid-column: 1 / 2;
    }

    .col-2-2 {
        grid-column: 1 / 2;
    }

    .segment > .col-2-2 {
        grid-column: 1 / 3;
    }

    .col-last {
        grid-column: 2 / 3;
    }

    .col-1-3 {
        grid-column: 1 / 2;
    }

    .col-2-3 {
        grid-column: 1 / 2;
    }

    .col-3-3 {
        grid-column: 1 / 2;
    }

    .row-first {
        grid-row: 1 / 2;
    }

    .buttons {
        grid-column: 2 / 3;
        grid-row: 7 / 8;
    }
}
</style>
