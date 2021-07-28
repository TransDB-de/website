<template>
	<span class="input" :class="valid ? '' : 'invalid'">
		<span v-if="!valid" class="error">{{errorMSG}}</span>
		<span v-if="required && !valid" class="required">Pflichtfeld</span>

		<select v-if="type == 'select'" v-bind="{ ...$props, ...$attrs }" @input="$emit('input', $event.target.value)" >
			<slot />
		</select>
		<input v-else v-bind="{ ...$props, ...$attrs }" @input="$emit('input', $event.target.value)" />
	</span>
</template>

<script>
export default {
	name: "Input",
	props: [
		"type",
		"required",
		"errorMSG",
		"invalid",
		"checkValid"
	],
	data() {
		return {
			valid: true
		}
	},
	watch: {
		checkValid() {
			this._checkValid();
		},
		invalid(val) {
			this.valid = !val;
		}
	},
	methods: {
		_checkValid() {
			if (this.invalid) return;

			var el = this.$el.querySelector("input, select");
			this.valid = el.checkValidity();
		}
	}
}
</script>

<style scoped>

span.input {
	position: relative;
	margin-bottom: 20px;
}

span input, span select {
	font-family: 'Poppins', sans-serif;
	font-size: 18px;
	color: var(--color-text);
	background-color: var(--color-input-background);
	outline: 0;
	border-radius: 4px;
	border: 2px solid var(--color-input-outline);
	padding: 6px 12px;
	transition: 0.2s ease border;
	width: 100%;
}

span input:focus {
	border: 2px solid var(--color-input-outline-focus);
}

span input::placeholder {
	color: var(--color-input-placeholder);
	font-weight: 500;
}

span.invalid input,
span.invalid select {
	border: 2px solid var(--color-error);
}

span .required {
	position: absolute;
	top: -12px;
	right: 0;
	font-size: 12px;
	color: var(--color-input-outline-focus);
}

span .error {
	position: absolute;
	top: -12px;
	left: 0;
	font-size: 12px;
	height: 12px;
	color: var(--color-error);
	overflow: hidden;
}

@media only screen and (max-width: 720px) {
	span .required {
		visibility: hidden;
	}
}

</style>