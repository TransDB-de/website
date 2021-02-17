<template>
    <div>
        <nuxt-content :document="privacyPage"></nuxt-content>
        <nuxt-content :document="disclaimerPage"></nuxt-content>
        <nuxt-content :document="entryRemovalPolicyPage"></nuxt-content>
    </div>

</template>

<script>
export default {
    name: "privacy",
    async asyncData({ $content }) {
        const privacyPage = await $content("privacy").fetch();
        const disclaimerPage = await $content("disclaimer").fetch();
        const entryRemovalPolicyPage = await $content("entryRemovalPolicy").fetch();
        return { privacyPage, disclaimerPage, entryRemovalPolicyPage }
    }
}
</script>

<style scoped>
.nuxt-content-container {
    padding: 20px;
    max-width: 750px;
    position: initial;
}

.nuxt-content p {
    margin: 20px 0 50px 0;
}
</style>