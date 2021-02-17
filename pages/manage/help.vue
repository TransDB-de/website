<template>
    <nuxt-content :document="helpPage" />
</template>

<script>
export default {
    name: "databaseHelp",
    async asyncData({ $content }) {
        const helpPage = await $content("databaseHelp").fetch();
        return { helpPage };
    }
}
</script>

<style>
.nuxt-content {
    max-width: 980px;
    align-self: center;
}

.nuxt-content code {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 0.5em;
    position: relative;
    margin: 0 4px;
}

.nuxt-content code:before {
    content: "";
    position: absolute;
    display: block;
    top: -2px;
    left: -4px;
    width: 100%;
    height: 100%;
    z-index: -1;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: var(--color-important-text);
}

.nuxt-content p {
    line-height: 1.4em;
    padding: 0 1em;
}

.nuxt-content h2, .nuxt-content h3, .nuxt-content h4 {
    margin-top: 2em;
    margin-bottom: 0.8em;
}

.nuxt-content em {
    color: var(--color-grey);
}
</style>
