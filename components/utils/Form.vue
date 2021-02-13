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
                this.$el.reset();
            }
            
            this.$emit("submit", data);
            
        },
        
        getValueFromInput: function (input) {
    
            if (input.type === "checkbox") {
        
                if (input.value.length > 0) {
            
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
            } else {
                return input.value;
            }

            return null;
            
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
    color: #334450;
    outline: 0;
    border-radius: 4px;
    border: 2px solid rgba(51, 68, 80, 0.15);
    padding: 6px 12px;
    margin-bottom: 20px;
    transition: 0.2s ease border;
}

form input:focus {
    border: 2px solid rgba(51, 68, 80, 0.4);
}

form.inline input, form.inline select {
    margin-bottom: 0;
    padding: 5px 10px;
    font-size: 16px;
}

form h3 {
    margin-top: 0;
}

form.inline * {
    margin-right: 10px;
}

form.inline *:last-child {
    margin-right: 0;
}

form input::placeholder {
    color: #0000004C;
    font-weight: 500;
}

form.inline .checkbox-container {
    margin-bottom: 0;
}

</style>