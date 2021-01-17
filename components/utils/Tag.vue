<template>

    <span class="tag">
        <slot />
    </span>
    
</template>

<script>
export default {
name: "Tag"
}
</script>

<style scoped>

.tag {
    display: inline-flex;
    background-color: rgba(51, 68, 80, 0.15);
    padding: 2px 8px;
    border-radius: 4px;
}

</style>