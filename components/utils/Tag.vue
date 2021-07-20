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
    background-color: var(--color-light);
    padding: 3px 8px;
    border-radius: 4px;
    cursor: default;
}

</style>