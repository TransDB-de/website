<template>

	<div class="user-item">
		
		<div>
			<h1>{{ user.username }}</h1>
		
			<span>
				<b>E-Mail:</b> {{ user.email }}
			</span>
		
			<span>
				<b>Admin:</b> {{ user.admin ? 'Ja' : 'Nein' }}
			</span>
		
			<span>
				<b>Registriert:</b> {{ formatDate(user.registerDate) }}
			</span>
		
			<span>
				<b>Letzter Login:</b> {{ formatDate(user.lastLogin) }}
			</span>
		</div>
		
		<div>
			<Button color="red" @click="deleteUser" title="Benutzer löschen" icononly center>
				<trash-icon></trash-icon>
			</Button>
			<Button @click="resetPassword" title="Passwort zurücksetzen" icononly center>
				<key-icon></key-icon>
			</Button>
		</div>
	
	</div>

</template>

<script>
import Button from "@/components/utils/Button";
import {TrashIcon, KeyIcon} from "vue-feather-icons";

export default {
	name: "UserItem",
	components: {Button, TrashIcon, KeyIcon},
	props: {
		user: Object
	},
	methods: {
		formatDate: function (date) {
			return new Date(date).toLocaleDateString('de-DE', { year: 'numeric', day: '2-digit', month: '2-digit' })
		},
		resetPassword: async function() {
	
			let sure = confirm("Soll das Passwort dieses Benutzers wirklich zurückgesetzt werden?");
	
			if(!sure) return;
	
			let res = null;
			
			try {
				res = await this.$axios.$put("users/" + this.user._id + "/password");
			} catch (e) {
				this.$errorMsg(`Fehler beim zurücksetzen (Fehler Code: ${e.response.status})`);
				return;
			}

			await navigator.clipboard.writeText(res.password);
			this.$okMsg("Das neue Passwort wurde in deine Zwischenablage kopiert")
			
		},
		deleteUser: async function() {
		
			let sure = confirm("Soll dieser Benutzer wirklich gelöscht werden?");
			
			if(!sure) return;
			
			try {
				await this.$axios.$delete("users/" + this.user._id);
				this.$okMsg("Nutzer gelöscht");
			} catch (e) {
				this.$errorMsg(`Fehler beim löschen (Fehler Code: ${e.response.status})`)
				return;
			}
			
			this.$emit("removed", this.user._id);
			
		}
	}
}
</script>

<style scoped>
.user-item {
	display: flex;
	background-color: var(--color-input-background);
	box-shadow: 1px 1px 6px var(--color-box-shadow);
	border-radius: 4px;
	padding: 10px 10px 10px 20px;
	margin-bottom: 20px;
	word-break: break-word;
}

.user-item h1 {
	font-size: 24px;
	margin: 0;
	font-weight: 500;
	text-align: left;
}

.user-item > div {
	display: flex;
	flex-direction: column;
}
.user-item > div:first-child {
	flex-grow: 1;
}

.user-item button {
	margin-bottom: 10px;
	width: 40px;
	height: 40px;
}

</style>