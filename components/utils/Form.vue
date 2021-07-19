<template>

    <form @submit.prevent="submit" :class="{ inline }">
        <slot />
    </form>

</template>

<script>
export default {
    name: "Form",
    props: {
        inline: Boolean,
        reset: Boolean
    },
    methods: {
        
        submit: function() {
            
            let fields = this.$el.querySelectorAll("input, select");
            
            let data = {};
            
            // Map input fields to object
            for (let input of fields) {
 
                let value = this.getValueFromInput(input);
                
                // Continue if input has no value
                if (value === null || value === undefined || value.length < 1) {
                    continue;
                }
                
                // Format to array
                if (input.name.endsWith("[]")) {
                    
                    let realname = input.name.slice(0, -2);
                    
                    // Create array if not exist
                    if(!Array.isArray(data[realname])) {
                        data[realname] = [];
                    }
                    
                    data[realname].push(value);
                    
                } else {
                    data[input.name] = value;
                }
                
            }
            
            if (this.reset) {
                this.resetForm();
            }
            
            this.$emit("submit", data);
            
        },
        
        getValueFromInput: function (input) {
            if (input.type === "checkbox") {
        
                if (input.classList.contains("multistate")) {
                    return input.value;
                } else if (input.value.length > 0) {
            
                    if (input.checked) {
                        return input.value;
                    }
            
                } else {
                    return input.checked;
                }
        
            } else if (input.type === "radio") {

                if (input.checked) {
                    return input.value;
                }

            } else if (input.type === "number") {
                return parseFloat(input.value);
            } else if (typeof input.value === "string" && input.type !== "password") {
                return input.value.trim();
            } else {
                return input.value;
            }

            return null;
            
        },
        
        resetForm: function () {
            this.$el.reset();
        }
        
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}

form div {
    display: flex;
    flex-direction: column;
}

form.inline div {
    flex-direction: row;
}

form.inline {
    flex-direction: row;
    flex-wrap: wrap;
}

form input, form select {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: var(--color-text);
    background-color: var(--color-input-background);
    outline: 0;
    border-radius: 4px;
    border: 2px solid var(--color-input-outline);
    padding: 6px 12px;
    margin-bottom: 20px;
    transition: 0.2s ease border;
    width: 100%;
}

form input:focus {
    border: 2px solid var(--color-input-outline-focus);
}

form.inline input, form.inline select {
    margin-bottom: 0;
    padding: 5px 10px;
    font-size: 16px;
}

form h3 {
    margin-top: 0;
    text-align: left;
}

form.inline * {
    margin-right: 10px;
}

form.inline *:last-child {
    margin-right: 0;
}

form input::placeholder {
    color: var(--color-input-placeholder);
    font-weight: 500;
}

form.inline .checkbox-container {
    margin-bottom: 0;
}

</style>