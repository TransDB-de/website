<template>

    <button :class="[color, light ? 'light' : '', center ? 'center' : '', icononly ? 'icon-only' : '']" @click="click">
        <slot v-if="!loading" />
        <Loader v-else :dark="light" />
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
        icononly: Boolean
    },
    methods: {
        
        click: function () {
            this.$emit("click");
        }
        
    }
}
</script>

<style scoped>

button {
    border: 0;
    color: white;
    background-color: var(--color-dark);
    box-shadow: 0 3px 6px var(--color-box-shadow);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    outline: 0;
    transition: 0.12s ease background-color;
    font-family: 'Poppins', sans-serif;
}

button:not(.light) {
    height: 40px;
}

button:hover, button:focus {
    background-color: var(--color-dark-accent);
}

button:active {
    background-color: var(--color-dark-active);
}

.red {
    background-color: var(--color-red);
}

.red:hover, .red:focus {
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
    padding: 5px 10px;
}

.light:hover, .light:focus {
    background-color: var(--color-light-accent);
}

.light:active {
    background-color: var(--color-light-active);
}

.center {
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 720px) {
    
    .light .feather {
        margin: 0;
    }
    
}
</style>