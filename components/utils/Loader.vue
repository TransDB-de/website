<template>

    <span :class="{ loader: true, dark }">
    
    </span>
    
</template>

<script>
export default {
    name: "Loader",
    props: {
        dark: Boolean
    }
}
</script>

<style scoped>
.loader {
    display: inline;
    height: 23px;
    width: 23px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid var(--color-loader);
    border-right: 2px solid var(--color-loader);
    animation: spin 0.4s linear infinite;
}

.loader.dark {
    border-top: 2px solid var(--color-dark);
    border-right: 2px solid var(--color-dark);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>