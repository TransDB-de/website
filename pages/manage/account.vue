<template>

    <div class="account">
    
        <h1>Account Einstellungen</h1>
        
        <Form @submit="changeUsername">
            <h2>Benutzername ändern</h2>
            <input name="username" placeholder="Neuer Benutzername" :value="username"/>
            <Button center>Speichern</Button>
        </Form>
        
        <Form @submit="changePassword" reset>
            <h2>Passwort ändern</h2>
            <p>
                Mindestens 8 Zeichen
            </p>
            <input name="old" placeholder="Altes Passwort eingeben" type="password" />
            <input name="new" placeholder="Neues Passwort eingeben" type="password" />
            <input name="check" placeholder="Neues Passwort wiederholen" type="password" />
            <Button center>Speichern</Button>
        </Form>
    
        <Form @submit="changeEmail">
            <h2>E-Mail ändern</h2>
            <input name="email" placeholder="Neue E-Mail Adresse" :value="email" />
            <Button center>Speichern</Button>
        </Form>
        
        <h2>Abmelden</h2>

        <Button color="red" @click="logout" center>
            <LogOutIcon />
            Abmelden
        </Button>
        
    </div>
    
</template>

<script>
import Form from "@/components/utils/Form";
import Button from "@/components/utils/Button";
import { LogOutIcon } from "vue-feather-icons";

export default {
    name: "account",
    components: {Button, Form, LogOutIcon},
    meta: {
        authRequired: true
    },
    computed: {
        username: function () {
            
            if(this.$store.state.user) {
                return this.$store.state.user.username;
            } else {
                return "";
            }
            
        },
        email: function () {
    
            if(this.$store.state.user) {
                return this.$store.state.user.email;
            } else {
                return "";
            }
            
        }
    },
    methods: {
    
        logout: function () {
            
            this.$store.commit("SET_LOGIN_TOKEN", null);
            this.$store.commit("SET_USER_DATA", null);
            this.$axios.setToken(false);
            
            window.location.href = '/';
            
        },
        
        changeUsername: async function (form) {
            
            let res;
            
            try {
                res = await this.$axios.$put("users/me/username", form);
                alert("Benutzername erfolgreich geändert");
            } catch (e) {
                if(e.response.status === 409) {
                    alert("Fehler: Es gibt bereits einen Benutzer mit diesem Namen");
                } else {
                    alert("Fehler: Ein unbekanntes Problem ist aufgetreten (" + e.response.status + ")");
                }
            }
            
        },
        
        changePassword: async function (form) {
            
            let res;
            
            if(form.new !== form.check) {
                alert("Die neuen Passwörter stimmen nicht überein");
                return;
            }
            
            try {
                
                res = await this.$axios.$put("users/me/password", form);
                alert("Passwort erfolgreich geändert");
                
            } catch (e) {
                if(e.response.status === 400) {
                    alert("Fehler: Das alte passwort ist falsch");
                } else if(e.response.status === 422) {
                    alert("Fehler: Das Passwort muss mindestens 8 Zeichen lang sein");
                } else {
                    alert("Fehler: Ein unbekanntes Problem ist aufgetreten (" + e.response.status + ")");
                }
            }
            
        },
        
        changeEmail: async function (form) {
            
            let res;
    
            try {
                res = await this.$axios.$put("users/me/email", form);
                alert("E-Mail erfolgreich geändert");
            } catch (e) {
                if(e.response.status === 409) {
                    alert("Fehler: Es gibt bereits einen Benutzer mit dieser E-Mail Adresse");
                } else {
                    alert("Fehler: Ein unbekanntes Problem ist aufgetreten (" + e.response.status + ")");
                }
            }
            
        }
    
    }
}
</script>

<style scoped>

.account {
    align-self: center;
    max-width: 600px;
    margin: 0 40px;
}

.account h1, .account h2, .account p {
    text-align: center;
}

.account p {
    margin-top: 0;
}

button {
    margin-bottom: 20px;
    min-width: min-content;
    width: 70%;
    align-self: center;
}

</style>