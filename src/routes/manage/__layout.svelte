<script lang="ts">
	import SettingsIcon from "lucide-icons-svelte/settings.svelte"
	import LogOutIcon from "lucide-icons-svelte/logOut.svelte"
	import Button from "$components/elements/button.svelte"
	import NavLink from "$components/elements/navLink.svelte"
	
	import { userdata } from "$lib/store"
	import { browser } from "$app/env"
	
	const linkOptions = {
		shadow: false,
		color: "var(--color-edge)",
		lineHeight: "2px"
	}
	
	let username: string = "Account";
	$: {
		if (browser) { username = $userdata.username; }
	}
</script>

<div class="manage-nav">
	<nav>
		<NavLink {...linkOptions} > Freischalten </NavLink>
		<NavLink {...linkOptions} > Datenbank </NavLink>
		<NavLink {...linkOptions} > Nutzer </NavLink>
	</nav>
	<span class="account">
		<Button light>
			<SettingsIcon class="settings-icon" size="28px"/>
			{ username }
		</Button>
		
		<Button iconOnly light color="red">
			<LogOutIcon class="logout-icon"/>
		</Button>
	</span>
</div>

<slot></slot>

<style lang="scss">
	@import "../../scss/mixins";
	
	.manage-nav {
		background-color: var(--color-background-bright);
		
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		
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
			padding: 8px;
		}
	}
</style>
