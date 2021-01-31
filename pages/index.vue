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
    color: white;
    padding: 8px 10px;
    border-radius: 4px;
    background: linear-gradient(90deg, #3eb9e9, #dd788b);
}

.homepage p {
    margin: 20px 0 50px 0;
}
</style>