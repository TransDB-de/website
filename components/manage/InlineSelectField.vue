<template>
	<div class="inline-field">
		{{ heading }}
		<select v-if="editable" :value="value" @input="$emit('input', $event.target.value)">
			<option v-for="(val, key) in mapping" :key="key" :value="key">{{ val }}</option>
		</select>
		<span v-else >
			{{ mapping[value] }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		value: String,
		mapping: Object,
		editable: Boolean,
		heading: String
	}
}
</script>

<style scoped>
@import "@/css/inline-fields.css";
</style>
