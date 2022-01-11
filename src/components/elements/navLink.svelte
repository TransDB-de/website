<script lang="ts">
	import { page } from "$app/stores"
	
	export let exact = false;
	export let href = "/";
	export let color = "var(--color-edge-bright)";
	export let shadow = true;
	export let lineHeight = "3px";
	export let lineOffset = "0";
	
	$: active = $page.url.pathname.startsWith($$props.href) ? "active" : "";
	$: activeExact = $page.url.pathname === $$props.href ? "active" : "";
</script>

<a {...$$props}
   href={href} 
   class="nav-link {exact ? activeExact : active}"
   class:shadow
   style="--color: { color }; --line-height: { lineHeight }; --line-offset: { lineOffset };">
	<slot> </slot>
</a>

<style lang="scss">
	@import "../../scss/mixins";
	@import "../../scss/shadows";
	
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
		white-space: nowrap;
		
		@include underline(
			$color: var(--color),
			$height: var(--line-height),
			$offset: var(--line-offset)
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
