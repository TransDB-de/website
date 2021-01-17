<template>
    
    <nuxt-content :document="privacyPage"></nuxt-content>

</template>

<script>
export default {
    name: "privacy",
    async asyncData({ $content }) {
        const privacyPage = await $content("privacy").fetch();
        return { privacyPage }
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