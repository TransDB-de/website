<template>
    
    <label class="checkbox-container">
        {{ placeholder }}
        <input type="checkbox" :name="name" :value="value" />
        <span class="checkmark"></span>
    </label>
    
</template>

<script>
export default {
    name: "Checkbox.vue",
    props: {
        placeholder: String,
        name: String,
        value: String
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
.checkmark {
    position: absolute;
    border-radius: 4px;
    border: 2px solid rgba(51, 68, 80, 0.15);
    left: 0;
    height: 28px;
    width: 28px;
    background-color: white;
    transition: 0.2s ease border;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
    left: 8px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid #3eb9e9;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>