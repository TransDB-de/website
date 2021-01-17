<template>

    <span class="loader">
    
    </span>
    
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style scoped>
.loader {
    display: inline;
    height: 23px;
    width: 23px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0);
    border-top: 2px solid #FFF;
    border-right: 2px solid #FFF;
    animation: spin 0.4s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>