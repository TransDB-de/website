<template>
    
    <nuxt-content :document="imprintPage"></nuxt-content>

</template>

<script>
export default {
    name: "imprint",
    async asyncData({ $content }) {
        const imprintPage = await $content("imprint").fetch();
        return { imprintPage }
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