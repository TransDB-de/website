<template>
    <div class="entry-page">
        <h1>Eintrag ansehen</h1>
        
        <Entry v-if="entry" :entry="entry" />
        
        <h2 v-if="!entry">Eintrag nicht gefunden</h2>
        
        <Button @click="click">
            Zurück zur Suche
        </Button>
    </div>
</template>

<script>
import Entry from "../../components/Entry";
import Button from "../../components/utils/Button";
export default {
    components: {Button, Entry},
    data() {
        return {
            entry: null
        }
    },
    async asyncData({params, $axios}) {
        if (!params.entry) return;
        let entry = null;
        
        try {
            entry = await $axios.$get("entries/" + params.entry);
        } catch (e) {}
        
        return {entry};
    },
    methods: {
        click() {
            this.$router.push({ name: "search" });
        }
    }
}
</script>

<style scoped>
.entry-page {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin: 20px;
    flex-grow: 1;
    text-align: center;
    max-width: 860px;
    width: calc(100% - 40px);
}

.entry-page button {
    max-width: 320px;
    align-self: center;
}

.entry-page h1 {
    margin: 20px 0;
    text-align: left;
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-light);
}
</style>