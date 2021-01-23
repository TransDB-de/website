<template>

    <label v-if="radio">
        <input type="radio" :value="value" :name="radio" />
        <span :class="[color, light ? 'light' : '', center ? 'center' : '', icononly ? 'icon-only' : '']" class="button">
            <slot v-if="!loading" />
            <Loader v-else />
        </span>
    </label>

    <button v-else :class="[color, light ? 'light' : '', center ? 'center' : '', icononly ? 'icon-only' : '']" :value="value" @click="click" class="button">
        <slot v-if="!loading" />
        <Loader v-else />
    </button>
    
</template>

<script>
import Loader from "@/components/utils/Loader";

export default {
    name: "Button",
    components: {Loader},
    props: {
        light: Boolean,
        center: Boolean,
        color: String,
        loading: Boolean,
        icononly: Boolean,
        active: Boolean,
        radio: String,
        value: String,
    },
    methods: {
        
        click: function () {
            this.$emit("click");
        }
        
    }
}
</script>

<style scoped>

label, button {
    display: flex;
    align-items: center;
}

span {
    width: 100%;
}

.button {
    border: 0;
    color: white;
    background-color: var(--color-dark);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 4px;
    outline: 0;
    transition: 0.12s ease background-color;
    font-family: 'Poppins', sans-serif;
}

.button:not(.light) {
    height: 40px;
}

.button:hover, .button:focus, input:hover + .button {
    background-color: var(--color-dark-accent);
}

.button:active {
    background-color: var(--color-dark-active);
}

input:checked + .button {
    background-color: var(--color-input-selected);
}

input:checked:hover + .button {
    background-color: var(--color-selected-hover);
}

label > input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
}

.red {
    background-color: var(--color-red);
}

.red:hover, .red:focus, input:hover + .red {
    background-color: var(--color-red-accent);
}

.red:active {
    background-color: var(--color-red-active);
}

.feather {
    stroke-width: 3;
    margin-right: 5px;
    width: 18px;
    height: 18px;
}

.icon-only .feather {
    margin: 0;
}

.light {
    background-color: var(--color-light);
    box-shadow: none;
    color: #334450;
}

.light:hover, .light:focus, input:hover + .light {
    background-color: var(--color-light-accent);
}

.light:active {
    background-color: var(--color-light-active);
}

.center {
    justify-content: center;
}

@media only screen and (max-width: 720px) {
    
    .light .feather {
        margin: 0;
    }
    
}
</style>