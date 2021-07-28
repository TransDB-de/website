<template>
	
	<label>
		<input type="checkbox" :name="name" :value="value" :checked="checked" v-model="checkboxModel" />
		<span><slot /></span>
	</label>

</template>

<script>
export default {
	name: "CheckboxButton",
	props: {
		checked: Boolean,
		name: String,
		value: String,
		model: Set
	},
	computed: {
		checkboxModel: {
			get() {
				return this.model.has(this.value);
			},

			set(checked) {
				let set = new Set(this.model);

				if (checked) {
					set.add(this.value);
				} else {
					set.delete(this.value);
				}

				this.$emit("change", set);
			}
		}
	}
}
</script>

<style scoped>

label {
	margin: 2px;
}

span {
	display: inline-flex;
	background-color: var(--color-light);
	padding: 3px 8px;
	border-radius: 4px;
	cursor: pointer;
}

span:hover, input:hover ~ span {
	background-color: var(--color-light-accent);
}

input:checked ~ span {
	background-color: var(--color-checkbox-selected);
	color: var(--color-checkbox-selected-text);
}

input:checked ~ span:hover, input:checked:hover ~ span {
	background-color: var(--color-selected-hover);
}

input {
	opacity: 0;
	position: absolute;
	cursor: pointer;
}

@media only screen and (max-width: 720px) {
	span {
		font-size: 17px;
		padding: 4px 8px;
	}
}

</style>
