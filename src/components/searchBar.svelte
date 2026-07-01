<script lang="ts">
	import Button from "$components/elements/button.svelte";

	import { Search, MapPin } from "@lucide/svelte";

	import { isMobile } from "$lib/store";
	import { page } from "$app/state";
	import { afterNavigate, goto } from "$app/navigation";

	import { env } from "$env/dynamic/public";

	import { isKey, getGeoLocation } from "$lib/utils";
	import { t } from "$lib/localization.svelte";
	import { popupError } from "./popup.svelte";

	interface Props {
		hide?: boolean;
		[key: string]: unknown;
	}

	let { hide = false, ...rest }: Props = $props();

	let locationText = $state(page.url.searchParams.get("location") ?? "");

	let isTextSearch = $derived(locationText.trim().length > 0);

	let loading = $state(false);

	// React on navigating. Delete locationText if query is empty (resetted by user)
	afterNavigate((nav) => {
		if (nav.to?.url.searchParams.has("location")) {
			locationText = nav.to.url.searchParams.get("location") ?? "";
		}

		if (locationText && !nav.to?.url.searchParams.has("location")) {
			locationText = "";
		}
	});

	function buildParams(overrides: Record<string, string | null> = {}): URLSearchParams {
		const params = new URLSearchParams(page.url.searchParams);
		for (const [key, value] of Object.entries(overrides)) {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		}
		return params;
	}

	function resetLocation() {
		const params = buildParams({ location: null, lat: null, long: null });
		goto(params.toString() ? "/search?" + params.toString() : "/search");
	}

	async function search(type: string) {
		loading = true;

		switch (type) {
			case "text": {
				if (locationText.length < 2) {
					resetLocation();
					loading = false;
					return;
				}

				const params = buildParams({ location: locationText, lat: null, long: null });
				if (typeof umami !== "undefined") umami.track(env.PUBLIC_UMAMI_EVENT_SEARCH_TEXT);
				loading = false;
				await goto("/search?" + params.toString(), { keepFocus: true });
				return;
			}
			case "distance": {
				try {
					const pos = await getGeoLocation();
					const params = buildParams({
						lat: pos.coords.latitude.toString(),
						long: pos.coords.longitude.toString(),
						location: null
					});
					locationText = "";
					if (typeof umami !== "undefined") umami.track(env.PUBLIC_UMAMI_EVENT_SEARCH_COORDS);
					loading = false;
					await goto("/search?" + params.toString(), { keepFocus: true });
				} catch (e) {
					resetLocation();
					loading = false;
					popupError(t("errors.locationAccessDenied"));
				}
				return;
			}
		}

		loading = false;
	}
</script>

<div class="search-bar" class:hide class:isTextSearch {...rest}>
	<input
		type="text"
		title={t("mouseOverTexts.locationSearch")}
		placeholder={$isMobile
			? t("header.searchBar.placeholderMobile")
			: t("header.searchBar.placeholder")}
		onkeydown={isKey("Enter", () => search("text"))}
		bind:value={locationText}
	/>

	<Button
		light
		onclick={() => search("distance")}
		title={t("mouseOverTexts.proximitySearch")}
		class="proximity-button"
		{loading}
	>
		<MapPin />
		<span class="hide-on-mobile">{t("header.searchBar.areaSearch")}</span>
	</Button>

	{#if isTextSearch}
		<Button
			light
			iconOnly
			onclick={() => search("text")}
			title={t("mouseOverTexts.locationSearchButton")}
			class="search-button"
		>
			<Search />
		</Button>
	{/if}
</div>

<style lang="scss">
	@use "../scss/shadows" as *;
	@use "../scss/mixins" as *;

	* {
		--button-icononly-width: 38px;
	}

	.search-bar {
		background-color: var(--color-background-bright);
		border-radius: 4px;
		padding: 5px;
		display: grid;
		width: calc(100% - 80px);
		max-width: 560px;
		min-width: min(240px, 100vw);
		overflow: hidden;
		box-shadow: $rim-shadow-soft;
		grid-template-columns: 1fr auto 0;
		transition: 0.4s ease grid-template-columns;

		input {
			background-color: transparent;
			border: 0;
			margin: 0;
			font-size: 18px;
			outline: 0;
			padding: 0 0 0 10px;
			min-width: 0;
			font-family: "Poppins", sans-serif;
			color: var(--color-edge);
		}

		input::placeholder {
			color: var(--color-edge-dimmed);
			font-weight: 500;
		}

		button {
			transition: 0.2s ease all;
			width: fit-content;
		}

		.proximity-button {
			transition: 0.4s background-color;
		}

		@include media-mobile {
			:global(.proximity-button .lucide) {
				margin: 0;
			}

			:global(.proximity-button) {
				padding: 7.5px;
			}
		}

		.search-button:not(.light) {
			height: 35px;
		}
	}

	.isTextSearch {
		grid-template-columns: 1fr auto calc(var(--button-icononly-width) + 4px);

		:global button.proximity-button {
			background-color: transparent;
		}
	}

	@include media-mobile {
		.hide-on-mobile {
			display: none;
		}

		.search-bar {
			max-width: 400px;
		}
	}
</style>
