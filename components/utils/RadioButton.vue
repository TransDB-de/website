<template>
    
    <label>
        <input type="radio" :name="name" :value="value" :checked="checked" />
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
    }
}
</script>

<style scoped>

label {
    display: flex;
    font-weight: 400;
    cursor: pointer;
    padding: 5px 10px;
}

label > span:hover {
    color: var(--color-radio-selected);
}

label > span {
    transition: 0.1s color;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}

label > input[type=radio]:checked ~ span {
    color: var(--color-radio-selected);
}

label > input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
}

</style>