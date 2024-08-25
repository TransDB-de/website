<script lang="ts">
	import SettingsIcon from "lucide-icons-svelte/settings.svelte"
	import LogOutIcon from "lucide-icons-svelte/logOut.svelte"
	import Button from "$components/elements/button.svelte"
	import NavLink from "$components/elements/navLink.svelte"
	
	import { popupOk } from "$components/popup.svelte";
	import { goto } from "$app/navigation";
	
	import { userdata, token } from "$lib/store"
	import { browser } from "$app/env"
	import config from "$lib/config";
	
	const linkOptions = {
		shadow: false,
		color: "var(--color-edge)",
		lineHeight: "2px",
		lineOffset: "-2px"
	}
	
	let username: string = "Account";
	let admin: boolean = false;
	let userId: string = "";
	$: {
		if (browser && $userdata) {
			username = $userdata.username;
			admin = $userdata.admin;
			userId = $userdata.id;
		}
	}
	
	function logout() {
		$userdata = null;
		$token = null;
		
		popupOk("Erfolgreich abgemeldet");
		goto("/");
	}
</script>

<div class="manage-nav">
	<nav>
		<NavLink {...linkOptions} exact href="/manage"> Freischalten </NavLink>
		<NavLink {...linkOptions} exact href="/manage/blocklist"> Blocklist </NavLink>
		
		{#if admin}
			<NavLink {...linkOptions} href="/manage/database"> Datenbank </NavLink>
			<NavLink {...linkOptions} href="/manage/users"> Benutzer </NavLink>
		{/if}
	</nav>
	<span class="account">
		<a class="light" href={config.cms_url + "/admin/users/" + userId} target="_blank">
			<SettingsIcon class="settings-icon" size="28px"/>
			{ username }
		</a>
		
		<Button iconOnly light color="red" on:click={ logout }>
			<LogOutIcon class="logout-icon"/>
		</Button>
	</span>
</div>

<style lang="scss">
	@import "../../scss/mixins";
	@import "../../scss/button";
	@import "../../scss/shadows";
	
	.manage-nav {
		background-color: var(--color-background-bright);
		
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		
		padding: 5px;
		box-shadow: $surface-shadow-soft;
		
		nav {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			
			@include media-mobile {
				justify-content: center;
			}
		}
		
		.account {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;
			
			@include media-mobile {
				justify-content: center;
			}

			a {
				@include button;
				text-decoration: none;
			}
		}
		
		@include media-mobile {
			flex-direction: column;
		}
	}
</style>
