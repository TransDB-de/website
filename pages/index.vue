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

.homepage p {
    line-height: 1.4em;
    margin: 30px 0;

    padding: unset;
}

.homepage h2 {
    margin-top: 50px;

    padding: unset;
    margin-bottom: unset;
}

.homepage a[href="/submit"] {
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