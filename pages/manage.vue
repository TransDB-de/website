<template>

    <div class="management">
    
        <h1>Management für Teammitglieder</h1>
    
        <h2>Ausstehende Einträge</h2>
        
        <FullEntry v-for="entry of entries" :entry="entry" @removed="loadEntries"></FullEntry>
        
        <h2 v-if="isAdmin">Benutzer</h2>
        
        <Form @submit="addUser" inline style="margin-bottom: 20px;" v-if="isAdmin">
            <input name="username" type="text" placeholder="Benutzername" required />
            <input name="email" type="email" placeholder="E-Mail" required />
            <Checkbox name="admin" placeholder="Admin" />
            <Button> Anlegen</Button>
        </Form>
        
        <UserItem v-if="isAdmin" v-for="user of users" :key="user._id" :user="user" @removed="loadUsers"/>
        
    </div>
    
</template>

<script>

import Form from "@/components/utils/Form";
import Checkbox from "@/components/utils/Checkbox";
import Button from "@/components/utils/Button";
import UserItem from "@/components/UserItem";
import FullEntry from "@/components/FullEntry";

export default {
    name: "manage",
    components: {FullEntry, UserItem, Button, Checkbox, Form},
    meta: {
        authRequired: true
    },
    data() {
        return {
            users: [],
            entries: []
        }
    },
    created() {
        this.loadEntries();
        this.loadUsers();
    },
    computed: {
        isAdmin: function() {
            return this.$store.state.user && this.$store.state.user.admin;
        }
    },
    methods: {
        
        loadUsers: async function() {
            try {
                this.users = await this.$axios.$get("users");
            } catch (e) {
                return;
            }
        },
        
        loadEntries: async function() {
            try {
                this.entries = await this.$axios.$get("entries/unapproved");
            } catch (e) {
                return;
            }
        },
        
        addUser: async function (form) {
            
            let res;
            
            try {
                res = await this.$axios.$post("users", form);
            } catch (e) {
                
                if(e.response.status === 422) {
                    alert("Fehler: Invalide Formulardaten")
                } else if(e.response.status === 409) {
                    alert("Fehler: Dieser Benutzer existiert bereits");
                } else {
                    alert("Fehler: Ein unbekanntes Problem ist aufgetreten (" + e.response.status + ")");
                }
                
                return;
                
            }
    
            await navigator.clipboard.writeText(res.password);
            alert("Der Benutzer wurde angelegt und das temporäre Password in die Zwischenablage kopiert");
            this.loadUsers();
            
        }
        
    }
}
</script>

<style scoped>
.management {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
</style>