<template>
    <div class="inline-field">
        {{ heading }}
        <input v-if="editable" :type="number ? 'number' : 'text'" :value="value" @input="$emit('input', $event.target.value)">
        <span v-else>{{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: "",
        editable: Boolean,
        heading: String,
        number: Boolean
    }
}
</script>

<style scoped>
@import "@/css/inline-fields.css";
</style>
