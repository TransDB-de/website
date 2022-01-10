<script lang="ts">
	import { browser } from "$app/env"
	import { isMobile } from "$lib/store"
	import { createEventDispatcher } from "svelte"
	
	import Button from "./button.svelte"
	
	const dispatch = createEventDispatcher();
	let scrollY: number;
	let aboveThreshold = false;
	
	export let loading: boolean = false;
	
	let loadOffset: number = 340;
	const loadThreshold = 0.5;
	
	$: {
		if (browser) {
			let pixelRatio = window.devicePixelRatio || 1;
			let height = isMobile ? window.innerHeight : window.screen.height;
			
			loadOffset = height * pixelRatio * loadThreshold;
			
			let scrolledHeight = Math.ceil(scrollY + window.innerHeight);
			
			// Check if user has scrolled to the bottom of the page
			if (scrolledHeight >= document.body.offsetHeight - loadOffset && scrollY > 0 && aboveThreshold) {
				aboveThreshold = false;
				dispatch("click");
			} else if ( scrolledHeight < document.body.offsetHeight - loadOffset) {
				aboveThreshold = true;
			}
		}
	}
</script>

<svelte:window bind:scrollY={ scrollY }/>

<div class="load-more">
	<Button light on:click { loading }>Mehr anzeigen</Button>
</div>

<style lang="scss">
	.load-more {
		display: flex;
		justify-content: center;
		position: relative;
		
		:global(button:after),
		:global(button:before) {
			content: "";
			display: flex;
			position: absolute;
			width: calc(50% - 85px);
			height: 2px;
			background-color: var(--color-edge-light);
			border-radius: 2px;
		}
		
		:global(button:before) {
			left: 0;
		}
		
		:global(button:after) {
			right: 0;
		}
	}
</style>