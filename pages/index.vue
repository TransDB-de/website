<template>
    
    <nuxt-content :document="indexPage" class="homepage"></nuxt-content>
    
</template>

<script>
export default {
    name: "index",
    async asyncData({ $content }) {
        const indexPage = await $content("homepage").fetch();
        return { indexPage }
    }
}
</script>

<style>
.homepage {
    padding: 20px;
    max-width: 750px;
    text-align: center;
    position: initial;
    font-size: 20px;
}

.homepage a[href="/submit"] {
    font-weight: 900;
    text-decoration: none;
    font-size: 18px;
    color: var(--color-background);
    padding: 8px 10px;
    border-radius: 4px;
    background: linear-gradient(50deg, var(--color-blue) 5%, var(--color-pink) 90%);
}

.homepage p {
    margin: 20px 0 50px 0;
}
</style>