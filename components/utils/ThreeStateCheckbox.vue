<template>
	
	<label class="checkbox-container">
		{{ placeholder }}
		<input
			type="checkbox"
			class="multistate"
			ref="checkbox"
			
			@click.stop="clicked"
			@keyup.space.prevent="clicked"
			:name="name"
			:value="checkboxModel"
		/>
		<span class="mark">?</span>
	</label>
	
</template>

<script>
export default {
	name: "ThreeStateCheckbox.vue",
	props: {
		placeholder: String,
		name: String
	},
	model: {
		prop: 'checkboxModel',
		event: 'change'
	},
	data() {
		return {
			stateCount: 0
		}
	},
	methods: {
		clicked: function() {
			this.stateCount = (this.stateCount + 1) % 3

			this.updateCheckbox();
			this.$emit('change', this.getValue());
		},
		updateCheckbox: function() {
			const cb = this.$refs.checkbox;

			switch (this.stateCount) {
				case 0:
					cb.checked = false;
					cb.indeterminate = true;
					break;
				case 1:
					cb.checked = true;
					cb.indeterminate = false;
					break;
				case 2:
					cb.checked = false;
					cb.indeterminate = false;
					break;
			}
		},
		getValue: function() {
			switch (this.stateCount) {
				case 0:
					return "unknown";
				case 1:
					return "yes";
				case 2:
					return "no";
			}
		}
	},
	mounted() {
		this.updateCheckbox();
	},
	computed: {
		checkboxModel: {
			get() {
				return this.getValue();
			},
			set(val) {
				switch (val) {
					case "unknown":
						this.stateCount = 0;
						break;
					case "yes":
						this.stateCount = 1;
						break;
					case "no":
						this.stateCount = 2;
						break;
				}

				this.updateCheckbox();
			}
		}
	}
}
</script>

<style scoped>
/* The container */
.checkbox-container {
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 20px;
	cursor: pointer;
	text-align: left;
	font-size: 18px;
	padding-left: 35px;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.mark {
	position: absolute;
	text-align: center;
	font-size: 1.2em;
	line-height: 1.2em;
	user-select: none;
	color: transparent;
	border-radius: 4px;
	border: 2px solid var(--color-input-outline);
	left: 0;
	height: 28px;
	width: 28px;
	background-color: var(--color-input-background);
	transition: 0.2s ease border;
}

.checkbox-container input:indeterminate ~ .mark {
	color: var(--color-input-placeholder);
}

.mark:before,
.mark:after {
	display: none;
	position: absolute;
	content: "";
	height: 3px;
	background-color: var(--color-red);
	top: 11px;
	left: 4px;
}

/* Show the mark when checked, or unchecked */
.checkbox-container input:checked ~ .mark:after,
.checkbox-container input:not(:indeterminate) ~ .mark:before,
.checkbox-container input:not(:indeterminate) ~ .mark:after {
	display: block;
}

.checkbox-container input:checked ~ .mark:before {
	display: none;
}

.mark:before {
	transform: rotate(45deg);
	width: 16px;
}

.mark:after {
	transform: rotate(315deg);
	width: 16px;
}

/* Style the checkmark/indicator */
.checkbox-container input:checked ~ .mark:after {
	left: 8px;
	top: 3px;
	width: 6px;
	height: 12px;
	border: solid var(--color-radio-selected);
	background-color: transparent;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
