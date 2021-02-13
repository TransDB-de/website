<template>
    <div class="inline-field">
        {{ heading }}
        <label class="checkbox" :class="editable ? 'editable' : ''" @change="val = !val; $emit('input', val)">
            <input v-if="editable" type="checkbox" :value="val">
            <div class="mark" :class="val ? 'selected' : ''"></div>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean,
        editable: Boolean,
        heading: ""
    },
    data() {
        return {
            val: Boolean
        }
    },
    created() {
        this.val = this.value;
    },
    watch: {
        value(newVal) {
            this.val = newVal;
        }
    }
}
</script>

<style scoped>
@import "@/css/inline-fields.css";

.inline-field {
    align-items: flex-start;
}

.checkbox {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
}

.checkbox > input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    width: 0;
    height: 0;
}

.checkbox > .mark {
    width: 100%;
    height: 100%;
    position: absolute;
}

.checkbox.editable {
    cursor: pointer;
}

.checkbox.editable:before {
    position: absolute;
    content: "";
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 4px;
    border: 2px solid #e1e3e5;
}

.checkbox > .mark:before, .checkbox > .mark:after {
    position: absolute;
    content: "";
    display: block;
    height: 3px;
    background-color: var(--color-red);
    top: 13px;
    left: 4px;
}

.checkbox > .mark.selected:before, .checkbox > .mark.selected:after {
    top: 19px;
    left: 11px;
    transform-origin: 1px 1px;
    background-color: var(--color-radio-selected);
}

.checkbox > .mark:before {
    transform: rotate(45deg);
    width: 22px;
}

.checkbox > .mark:after {
    transform: rotate(315deg);
    width: 22px;
}

.checkbox > .mark.selected:before {
    width: 10px;
    transform: rotate(225deg);
}

.checkbox > .mark.selected:after {
    width: 18px;
    transform: rotate(315deg);
}

</style>
