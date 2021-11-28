<script lang="ts">
	import { page } from "$app/stores"
	
	export let exact = false;
	export let href = "/";
	export let color = "white";
	export let shadow = true;
	
	$: active = $page.path.startsWith($$props.href) ? "active" : "";
	$: activeExact = $page.path === $$props.href ? "active" : "";
</script>

<a {...$$props} href={href} class="nav-link {exact ? activeExact : active}" class:shadow style="--color: {color}">
	<slot> </slot>
</a>

<style lang="scss">
	@import "../scss/mixins";
	@import "../scss/shadows";
	
	.nav-link {
		color: var(--color);
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		font-weight: 500;
		font-size: 20px;
		margin: 10px 10px;
		cursor: pointer;
		
		@include underline(
			$color: var(--color)
		);
		
		&:hover:after {
			width: 100%!important;
			opacity: 1!important;
		}
		
		&.active:after {
			opacity: 1!important;
			width: 70%;
		}
		
		&.shadow:after {
			box-shadow: $surface-shadow-small
		}
		
		&.shadow {
			text-shadow: $edge-shadow-small;
		}
	}
</style>
