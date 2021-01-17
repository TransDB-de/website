<template>

    <button :class="[color, light ? 'light' : '', center ? 'center' : '', icononly ? 'icon-only' : '']" @click="click">
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
        active: Boolean
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 4px;
    outline: 0;
    transition: 0.1s ease background-color;
    font-family: 'Poppins', sans-serif;
}

button:not(.light) {
    height: 40px;
}

button:hover {
    background-color: var(--color-dark-accent);
}

button.red {
    background-color: var(--color-red);
}

button.red:hover {
    background-color: var(--color-red-accent);
}

button .feather {
    stroke-width: 3;
    margin-right: 5px;
    width: 18px;
    height: 18px;
}

button.icon-only .feather {
    margin: 0;
}

button.light {
    color: #334450;
    background: rgba(51, 68, 80, 0.15);
    padding: 5px 10px;
    box-shadow: none;
}

button.light:hover {
    background: rgba(51, 68, 80, 0.20);
}

button.center {
    justify-content: center;
}

@media only screen and (max-width: 720px) {
    
    button.light .feather {
        margin: 0;
    }
    
}
</style>