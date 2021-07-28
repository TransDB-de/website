<template>
	
	<label>
		<input type="radio" :name="name" :value="value" :checked="checked" v-model="radioModel"/>
		<span><slot /></span>
	</label>

</template>

<script>
export default {
	name: "RadioButton",
	props: {
		checked: Boolean,
		name: String,
		value: String,
		model: String
	},
	computed: {
		radioModel: {
			get() {
				return this.model
			},

			set() {
				this.$emit("change", this.value);
			}
		}
	}
}
</script>

<style scoped>

label {
	display: flex;
	font-weight: 400;
	cursor: pointer;
}

label > span:hover, input:hover ~ span {
	padding: 5px 2px 5px 12px;
}

label > span {
	padding: 5px 7px 5px 7px;
	border-left: 3px solid var(--color-light);
	transition: 0.1s all;
	text-shadow: 0 0 1px var(--color-text-shadow);
}

label > input:checked ~ span {
	padding: 5px 2px 5px 12px;
	color: var(--color-radio-selected);
	border-left: 3px solid var(--color-radio-selected);
}

label > input {
	opacity: 0;
	position: absolute;
	cursor: pointer;
}

</style>
