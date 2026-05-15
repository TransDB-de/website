<script lang="ts">
	import { browser } from "$app/environment";
	import { isMobile } from "$lib/store";

	import Button from "./button.svelte";

	interface Props {
		loading?: boolean;
		onclick?: () => void;
	}

	const props: Props = $props();

	let scrollY = $state(0);
	let aboveThreshold = $state(false);

	const desktopLoadOffset = 720;
	const mobileLoadOffset = 1200;

	$effect(() => {
		if (browser) {
			const loadOffset = $isMobile ? mobileLoadOffset : desktopLoadOffset;

			let scrolledHeight = Math.ceil(scrollY + window.innerHeight);

			// Check if user has scrolled to the bottom of the page
			if (
				scrolledHeight >= document.body.offsetHeight - loadOffset &&
				scrollY > 0 &&
				aboveThreshold
			) {
				aboveThreshold = false;
				props.onclick?.();
			} else if (scrolledHeight < document.body.offsetHeight - loadOffset) {
				aboveThreshold = true;
			}
		}
	});
</script>

<svelte:window bind:scrollY />

<div class="load-more">
	<Button light onclick={props.onclick} loading={props.loading}>Mehr anzeigen</Button>
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
