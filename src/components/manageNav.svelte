<script lang="ts">
	import SettingsIcon from "lucide-icons-svelte/settings.svelte"
	import LogOutIcon from "lucide-icons-svelte/logOut.svelte"
	import Button from "$components/elements/button.svelte"
	import NavLink from "$components/elements/navLink.svelte"
	
	import { popupOk } from "$components/popup.svelte";
	import { goto } from "$app/navigation";
	
	import { userdata, token } from "$lib/store"
	import { browser } from "$app/env"
	
	const linkOptions = {
		shadow: false,
		color: "var(--color-edge)",
		lineHeight: "2px",
		lineOffset: "-2px"
	}
	
	let username: string = "Account";
	$: {
		if (browser && $userdata) { username = $userdata.username; }
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
		<NavLink {...linkOptions} href="/manage"> Freischalten </NavLink>
		<NavLink {...linkOptions} href="/manage/database"> Datenbank </NavLink>
		<NavLink {...linkOptions} href="/manage/users"> Nutzer </NavLink>
	</nav>
	<span class="account">
		<Button light  on:click={ () => goto("/manage/account") }>
			<SettingsIcon class="settings-icon" size="28px"/>
			{ username }
		</Button>
		
		<Button iconOnly light color="red" on:click={ logout }>
			<LogOutIcon class="logout-icon"/>
		</Button>
	</span>
</div>

<style lang="scss">
	@import "../scss/mixins";
	@import "../scss/shadows";
	
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
		}
		
		@include media-mobile {
			flex-direction: column;
		}
	}
</style>