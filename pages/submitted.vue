<template>
    
    <nuxt-content :document="submittedPage" class="homepage"></nuxt-content>

</template>

<script>
export default {
    name: "submitted",
    async asyncData({ $content }) {
        const submittedPage = await $content("submitted").fetch();
        return { submittedPage }
    }
}
</script>

<style scoped>
.nuxt-content-container {
    padding: 20px;
    max-width: 750px;
    text-align: center;
    position: initial;
    font-size: 20px;
}

.nuxt-content-container >>> p {
    line-height: 1.4em;
    margin: 30px 0;
}

.nuxt-content-container >>> h2 {
    margin-top: 50px;
}

.nuxt-content-container >>> a[href="/"] {
    border: 0;
    text-decoration: none;
    color: white;
    background-color: var(--color-dark);
    box-shadow: 0 3px 6px var(--color-box-shadow);
    cursor: pointer;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 4px;
    outline: 0;
    transition: 0.12s ease background-color;
    font-family: 'Poppins', sans-serif;
}

.nuxt-content-container >>> a[href="/"]:hover, .nuxt-content-container >>> a[href="/"]:focus {
    background-color: var(--color-dark-accent);
}

.nuxt-content-container >>> a[href="/"]:active {
    background-color: var(--color-dark-active);
}
</style>