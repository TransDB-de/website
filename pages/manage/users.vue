<template>
	<div v-if="isAdmin" class="users">
		<h1>Benutzer Verwaltung</h1>
		
		<h2>Neuen Benutzer Anlegen</h2>

		<Form @submit="addUser" inline class="form" reset>
			<input name="username" type="text" placeholder="Benutzername" required />
			<input name="email" type="email" placeholder="E-Mail" required />
			<Checkbox name="admin" placeholder="Admin" />
			<Button> Anlegen</Button>
		</Form>
		
		<h2>Benutzer</h2>

		<ul>
			<UserItem v-for="user of users" :key="user._id" :user="user" @removed="loadUsers"/>
		</ul>
	</div>
</template>

<script>
import Form from "@/components/utils/Form";
import Checkbox from "@/components/utils/Checkbox";
import Button from "@/components/utils/Button";
import UserItem from "@/components/manage/UserItem";
import AccountMixin from "@/mixins/account";

export default {
	name: "users",
	components: { Form, Checkbox, Button, UserItem },
	mixins: [ AccountMixin ],
	meta: {
        authRequired: true
	},
	data() {
		return {
			users: []
		}
	},
	created() {
		this.loadUsers();
	},
	methods: {
        
        loadUsers: async function() {
            try {
                this.users = await this.$axios.$get("users");
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
.users {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}

ul {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding: 0;
	margin-top: 0;
}

.form {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto auto;
    grid-template-areas: "name mail admn make";
    justify-items: stretch;
    width: 100%;
    column-gap: 10px;
    row-gap: 12px;
}

.form > input {
    margin: 0;
}

.form > input[type=text] {
    grid-area: name;
    min-width: none;
}

.form > input[type=email] {
    grid-area: mail;
    min-width: none;
}

.form > input[type=checkbox] {
    grid-area: admn;
}

.form > button {
    grid-area: make;
}

@media only screen and (max-width: 720px) {
    .form {
        grid-template-columns: auto 1fr;
        grid-template-areas: "name name"
                             "mail mail"
                             "admn make";
    }
}

</style>
