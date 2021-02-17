<template>
    
    <div class="login">
        
        <h1>Anmeldung für Teammitglieder</h1>
        
        <h2 class="error" v-if="error">{{ error }}</h2>
        
        <Form @submit="login" reset>
            
            <input type="text" name="username" placeholder="Benutzername" required />
            <input type="password" name="password" placeholder="Passwort" required />
            
            <Button center :loading="loading">
                <log-in-icon></log-in-icon>
                Anmelden
            </Button>
            
        </Form>
        
    </div>
    
</template>

<script>
import Form from "@/components/utils/Form";
import Button from "@/components/utils/Button";
import { LogInIcon } from "vue-feather-icons";

export default {
    name: "login.vue",
    components: {Button, Form, LogInIcon},
    data() {
        return {
            error: null,
            loading: false
        }
    },
    methods: {
        login: async function(form) {
            
            this.loading = true;
            
            let res;
            
            try {
                res = await this.$axios.$post("users/me/login", form);
            } catch (e) {

                if(e.response.status === 401) {
                    
                    this.error = "Ungültige Anmeldedaten";
                    
                    setTimeout(() => {
                        this.error = null;
                    }, 3000);
                    
                }
                
                this.loading = false;
                return;
                
            }
            
            this.$store.commit("SET_LOGIN_TOKEN", res.token);
            this.$store.commit("SET_USER_DATA", res.user);
            this.$axios.setToken(res.token, "Bearer");
            
            this.loading = false;
            
            await this.$router.push("/manage");
            
        }
    }
}
</script>

<style scoped>

.login {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 20px;
    flex-grow: 1;
    text-align: center;
}

.login > .error {
    color: var(--color-error);
    margin-top: 0;
}

</style>