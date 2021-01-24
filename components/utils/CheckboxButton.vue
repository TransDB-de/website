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
        model: Array
    },
    computed: {
        checkboxModel: {
            get() {
                return this.model.includes(this.value);
            },

            set(checked) {
                let index = this.model.indexOf(this.value);
                let valueArr = [...this.model];

                if (checked && index === -1) {
                    valueArr.push(this.value);
                }

                if (!checked && index !== -1) {
                    valueArr.splice(index, 1);
                }

                this.$emit("change", { value: valueArr, name: this.name });
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
    padding: 2px 8px;
    border-radius: 4px;
	cursor: pointer;
}

span:hover, input:hover ~ span {
	background-color: var(--color-light-accent);
}

input:checked ~ span {
	background-color: var(--color-checkbox-selected);
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
