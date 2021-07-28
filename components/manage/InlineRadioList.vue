<template>
	<div class="inline-field">
		{{ heading }}
		<div v-if="editable" class="edit-list">
			<CheckboxButton
				v-for="(val, key) in mapping" :key="key"
				:value="key"
				:model="model"
				@change="(n) => change(n)"
			> {{ val }} </CheckboxButton>
		</div>
		<ul v-else-if="mapping" class="show-list">
			<li v-for="val in value" :key="val">
				{{ mapping[val] }}
			</li>
		</ul>
	</div>
</template>

<script>
import CheckboxButton from "@/components/utils/CheckboxButton";

export default {
	components: { CheckboxButton },
	props: {
		value: Array,
		mapping: Object,
		editable: Boolean,
		heading: String,
		type: String
	},
	data() {
		return {
			model: Set
		}
	},
	watch: {
		/*
		mapping(newMapping) {
			if (!newMapping) {
				this.model = null;
				return;
			}

			if (!this.value) {
				return;
			}

			let mapArr = Object.keys(newMapping);

			this.model = this.value.filter(e => mapArr.includes(e));
		},*/

		value(newVal) {
			this._value = new Set(newVal);
		}
	},
	created() {
		this.model = new Set(this.value);
	},
	methods: {
		
		change(nSet) {
			this.model = nSet;
			this.$emit('input', new Array(...this.model));
		}
	}
}
</script>

<style scoped>
.inline-field {
	font-weight: 400;
	font-size: 15px;
	color: var(--color-grey);
	display: flex;
	flex-direction: column;
}

.edit-list, .show-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

ul {
	padding: 0;
}

.show-list > li {
	display: inline-block;
	background-color: var(--color-radio);
	color: var(--color-text);
	font-size: 15px;
	padding: 3px 8px;
	border-radius: 4px;
	margin: 2px;
}

@media only screen and (max-width: 720px) {
	.show-list > li {
		font-size: 17px;
		padding: 4px 8px;
	}
}
</style>
