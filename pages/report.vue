<template>

    <Form @submit="submit" class="report-form">

        <h1>Eintrag melden</h1>
        
        <Entry v-if="entry" :entry="entry"></Entry>

        <h2 class="error" v-if="error && !loading">{{ error }}</h2>
        
        <div class="textarea-with-limit-counter">
            <textarea
                name="message"
                rows="4"
                placeholder="Beschreibe dein Anliegen / deine Änderungsvorschläge"
                :maxlength="maxCharLength"
                minlength="10"
                v-model="message"
                ref="textarea"></textarea>
            <span v-if="message.length > maxCharLength - 50">{{ message.length }} / {{ maxCharLength }}</span>
        </div>
        
        
        <p>
            Beachte, dass deine Meldung von unserem gesamten Community-Team eingesehen werden kann.
        </p>
        
        <p>
            Bei sonstigen oder technischen Anliegen  melde dich bitte unter unserer
            <nuxt-link to="/imprint">E-Mail</nuxt-link>
            oder auf
            <a href="https://github.com/TransDB-de" target="_blank" rel="noopener">GitHub</a>.
        </p>
        
        <Button center :loading="loading">Melden</Button>
        
    </Form>
    
</template>

<script>
import Form from "@/components/utils/Form";
import Button from "@/components/utils/Button";
import Entry from "@/components/Entry";

export default {
    name: "report",
    components: {Entry, Form, Button},
    data() {
        return {
            entry: null,
            loading: false,
            error: null,
            maxCharLength: 800,
            message: ""
        }
    },
    async asyncData({ query, $axios }) {
        if (!query.id) return;
        
        let entry = await $axios.$get("entries/" + query.id);
        
        return {entry};
    },
    methods: {
        async submit(data) {
        
        }
    }
}
</script>

<style scoped>
.report-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin: 20px;
    flex-grow: 1;
    text-align: center;
    max-width: 860px;
}

.report-form > .error {
    color: var(--color-error);
    margin-top: 0;
    max-width: 500px;
    text-align: center;
    border-bottom: none;
}

.report-form h1, .report-form h2 {
    margin: 20px 0;
    text-align: left;
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-light);
}

.report-form p {
    margin: 0 0 20px 0;
    padding-bottom: 5px;
}

.report-form .textarea-with-limit-counter {
    position: relative;
}

.report-form .textarea-with-limit-counter > span {
    position: absolute;
    right: 5px;
    bottom: 0;
    color: var(--color-error);
    font-size: 12px;
    font-weight: 600;
}

.report-form >>> .entry .meta-button {
    display: none;
}
</style>