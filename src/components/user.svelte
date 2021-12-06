<script lang="ts">
	import type { User } from "$models/user.model"
	import axios from "axios"

	import Button from "$components/elements/button.svelte"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte"
	import { confirm } from "$components/confirm.svelte"
	import { fetchUsers } from "$components/usersCollection.svelte"
	
	import MailIcon from "lucide-icons-svelte/mail.svelte"
	import CalendarIcon from "lucide-icons-svelte/calendar.svelte"
	import ClockIcon from "lucide-icons-svelte/clock.svelte"
	import TrashIcon from "lucide-icons-svelte/trash.svelte"
	import KeyIcon from "lucide-icons-svelte/key.svelte"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	export let user: User = null;
	
	let loading = {
		delete: false,
		password: false
	}
	
	async function deleteUser() {
		let success: boolean = await confirm("Möchtest das Passwort dieses Benutzers wirklich zurücksetzen?");
		if (!success) return;
		
		loading.delete = true;
		
		try {
			await axios.delete("/users/" + user._id);
			popupOk("Benutzer gelöscht");
			fetchUsers();
		} catch (e) {
			popupError(`Unbekannter Fehler (${e.response.status})`);
		} finally {
			loading.delete = false;
		}
	}
	
	async function resetPassword() {
		let success: boolean = await confirm("Möchtest das Passwort dieses Benutzers wirklich zurücksetzen?");
		if (!success) return;
		
		loading.password = true;
		
		try {
			let res = await axios.put<{ password: string }>(`/users/${user._id}/password`);
			
			
			await navigator.clipboard.writeText(res.data.password);
			
			popupWarn("Passwort zurückgesetzt - Neues Passwort in die Zwischenablage kopiert");
		} catch (e) {
			console.warn(e);
			popupError(`Unbekannter Fehler (${e.response.status})`);
		} finally {
			loading.password = false;
		}
	}
</script>

<div class="user">
	<div class="data">
		<div class="heading">
			<h1> { user.username } </h1>
			
			{#if user.admin}
				<span class="special-tag pink"> Admin </span>
			{/if}
		</div>
		
		<p>
			{#if user.email}
				<span>
					<MailIcon />
					<b> E-Mail: </b>
					<span>{ user.email }</span>
			</span>
			{/if}
			
			{#if user.lastLogin}
				<span>
					<ClockIcon />
					<b> Letzter Login: </b>
					<span>{ (new Date(user.lastLogin)).toLocaleString() }</span>
				</span>
			{/if}
			
			<span>
				<CalendarIcon />
				<b> Registriert: </b>
				<span>{ (new Date(user.registerDate)).toLocaleString() }</span>
			</span>
		</p>
	</div>
	
	<div class="controls">
		<Button on:click={ resetPassword } light iconOnly title={ mouseOverTexts["resetPassword"] } loading={ loading.password }>
			<KeyIcon />
		</Button>
		
		<Button on:click={ deleteUser } light iconOnly color="edge-error" title={ mouseOverTexts["deleteUser"] } loading={ loading.delete }>
			<TrashIcon />
		</Button>
	</div>
</div>

<style lang="scss">
	@import "../scss/shadows";
	@import "../scss/mixins";
	
	.user {
		display: flex;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px;
		padding: 10px 15px 10px 20px;
		gap: 5px;
		
		.controls {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		
		@include media-mobile-small {
			padding: 10px;
			flex-direction: column;
			gap: 10px;
			
			.controls {
				flex-direction: row;
				gap: 20px;
				justify-content: center;
			}
		}
		
		.data {
			display: flex;
			flex-direction: column;
			gap: 10px;
			flex: 1;
			
			p {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				flex-wrap: wrap;
				gap: 10px 20px;
				font-size: 0.9em;
				margin: 0;
			}
			
			b {
				font-weight: 500;
			}
			
			.heading {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0 10px;
				
				h1 {
					font-size: 1.4em;
					font-weight: 600;
					margin: -4px 0;
					word-break: break-word;
					max-width: 100%;
				}
				
				.special-tag {
					padding: 2px 8px;
					border-radius: 4px;
					font-size: 0.8em;
					font-weight: 400;
					cursor: default;
					color: var(--color-edge-bright);
					
					&.pink {
						background-color: var(--color-surface-fancy);
					}
				}
			}
			
			span {
				display: inline-flex;
				align-items: center;
				gap: 5px;
				color: var(--color-edge);
				
				span {
					word-break: break-word;
					max-width: 100%;
				}
			}
			
			:global(.lucide) {
				height: 18px;
				width: 18px;
				min-height: 18px;
				min-width: 18px;
			}
		}
	}
</style>
