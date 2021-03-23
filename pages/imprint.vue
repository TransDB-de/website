<template>
    <div class="imprint">
        <nuxt-content :document="imprintPage"></nuxt-content>
        <nuxt-content :document="disclaimerPage"></nuxt-content>
        <nuxt-content :document="entryRemovalPolicyPage"></nuxt-content>
    </div>

</template>

<script>
export default {
    name: "imprint",
    async asyncData({ $content }) {
        const imprintPage = await $content("imprint").fetch();
        const disclaimerPage = await $content("disclaimer").fetch();
        const entryRemovalPolicyPage = await $content("entryRemovalPolicy").fetch();
        return { imprintPage, disclaimerPage, entryRemovalPolicyPage }
    }
}
</script>

<style scoped>
.nuxt-content-container {
    padding: 20px;
    max-width: 750px;
    position: initial;
}
.imprint >>> p {
    line-height: 1.4em;
    padding: 0 1em;
}

.imprint >>> h2, .imprint >>> h3, .imprint >>> h4 {
    margin-top: 2em;
    margin-bottom: 0.8em;
}
</style>