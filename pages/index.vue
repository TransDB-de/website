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

<style scoped>
.nuxt-content-container {
    padding: 20px;
    max-width: 750px;
    text-align: left;
    position: initial;
    /*font-size: 20px;*/
}

.nuxt-content-container >>> p {
    line-height: 1.4em;
    padding: 0 1em;
    margin: 20px 0;
}

.nuxt-content-container >>> h1 {
    text-align: center;
}

.nuxt-content-container >>> h2 {
    text-align: center;
    margin-top: 50px;
}

.nuxt-content-container >>> li {
    list-style: "- ";
}

.nuxt-content-container >>> a[href*="/search"] {
    font-weight: 600;
    text-decoration: none;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    color: var(--color-dark);
}

.nuxt-content-container >>> a[href="/submit"] {
    font-weight: 900;
    text-decoration: none;
    font-size: 18px;
    display: block;
    margin: auto;
    width: max-content;
    color: var(--color-background);
    padding: 8px 10px;
    border-radius: 4px;
    background: linear-gradient(50deg, var(--color-blue) 5%, var(--color-pink) 90%);
}
</style>