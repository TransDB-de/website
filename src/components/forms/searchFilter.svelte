<script lang="ts">
	import { ChevronRight, MapPin, Search } from "@lucide/svelte";

	import RadioButton from "$formElements/radioButton.svelte";
	import TagCheckbox from "$formElements/tagCheckbox.svelte";
	import Input from "$formElements/input.svelte";
	import Select from "$formElements/select.svelte";

	import Button from "$components/elements/button.svelte";

	import { clamp, timeout } from "$lib/utils";
	import { isMobile, currentLocation } from "$lib/store";
	import { env } from "$env/dynamic/public";
	import { t, tEntry } from "$lib/localization.svelte";

	import { browser } from "$app/environment";
	import { navigating, page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onDestroy, untrack } from "svelte";

	import { typeMapping, offerMapping, attributeMapping } from "$lib/entryMappings";

	let scrollY = $state(0);
	let expand = $state(true);

	let selectedType = $state($page.url.searchParams.get("type") ?? "");
	let selectedOffers = $state($page.url.searchParams.getAll("offers"));
	let selectedAttributes = $state($page.url.searchParams.getAll("attributes"));
	let textFilter = $state($page.url.searchParams.get("text") ?? "");

	let element: HTMLDivElement | undefined = $state();

	function toggleExpand() {
		expand = !expand;
	}

	// change counter
	let changeId = 0;

	// Automatic filter change handler
	// Applies filters after a short delay, so that the changes don't stack
	async function filtersUpdated() {
		// mobile changes are applied manually to save data
		if ($isMobile) {
			return;
		}

		if (!browser) {
			applyFilters();
		} else {
			changeId += 1;
			let thisChange = changeId;

			await timeout(
				env.PUBLIC_FILTER_APPLY_TIMEOUT ? Number(env.PUBLIC_FILTER_APPLY_TIMEOUT) * 1000 : 600
			);

			// if another change occured since the timer was started, do nothing
			if (changeId === thisChange) {
				applyFilters();
			}
		}
	}

	function typeUpdated() {
		selectedOffers = [];
		selectedAttributes = [];

		filtersUpdated();
	}

	function setQuery(field: string, value: unknown) {
		if (value) {
			if (Array.isArray(value)) {
				$page.url.searchParams.delete(field);

				for (let e of value) {
					$page.url.searchParams.append(field, e);
				}
			} else {
				$page.url.searchParams.set(field, value as string);
			}
		} else {
			$page.url.searchParams.delete(field);
		}
	}

	function resetLocation() {
		$currentLocation = "";

		$page.url.searchParams.delete("lat");
		$page.url.searchParams.delete("long");
		$page.url.searchParams.delete("location");

		applyFilters();
	}

	function applyFilters() {
		setQuery("type", selectedType);
		setQuery("offers", selectedOffers);
		setQuery("attributes", selectedAttributes);
		setQuery("text", textFilter);

		let searchString = "";
		if ($page.url.searchParams.toString()) {
			searchString = "?" + $page.url.searchParams.toString();
		}

		goto("/search" + searchString, { keepFocus: true, noScroll: true });
	}

	function resetFilter() {
		selectedType = "";
		selectedOffers = [];
		selectedAttributes = [];
		textFilter = "";
	}

	// React on navigating eg. reset filters if user navigates to /search without any other parameters
	const unsubscribe = navigating.subscribe((nav) => {
		if (
			nav &&
			nav.to?.url.pathname === "/search" &&
			nav.from?.url.pathname === "/search" &&
			Array.from(nav.to.url.searchParams).length < 1
		) {
			resetFilter();
		}
	});

	onDestroy(unsubscribe);

	// scroll edge case
	// this snippet ensures devices with small screens can scroll the sticky sidebar
	const topOffset = 56;
	let top = $state(topOffset);
	let prevY = $state(0);

	$effect(() => {
		const el = element;
		if (browser && el) {
			const currentY = scrollY;
			untrack(() => {
				const scrollDist = currentY - prevY;
				const offsetHeight = el.offsetHeight;
				let botOffset = Math.min(window.innerHeight - offsetHeight, topOffset);
				top = clamp(top - scrollDist, botOffset, topOffset);
				prevY = currentY;
			});
		}
	});
</script>

<svelte:window bind:scrollY />

<div class="search-filter" style="--scroll-y: {top}px" bind:this={element}>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="bar mobile" class:expand onclick={toggleExpand}>
		<ChevronRight class="chevron" size={24} />

		<span class="title"> {t("searchFilter.title")} </span>
	</div>

	<div class="filter" class:expand>
		{#if $currentLocation}
			<p class="sub-title">
				{t("searchFilter.location")}
				<Button light class="reset-location" onclick={resetLocation}>
					{t("searchFilter.delete")}
				</Button>
			</p>

			<p class="location" title={t("mouseOverTexts.location")}>
				<MapPin />
				<span> {$currentLocation} </span>
			</p>
		{/if}

		<p class="sub-title">{t("searchFilter.categories")}</p>

		<Select name="type" class="mobile" bind:value={selectedType} onchange={typeUpdated}>
			{#each typeMapping as type (type)}
				<option value={type}>
					{tEntry("typeMapping")[type]}
				</option>
			{/each}
		</Select>

		<fieldset class="desktop radio-buttons" oninput={typeUpdated}>
			{#each typeMapping as type (type)}
				<RadioButton name="type" bind:group={selectedType} value={type}>
					{tEntry("typeMapping")[type]}
				</RadioButton>
			{/each}
		</fieldset>

		{#if offerMapping[selectedType]}
			<p class="sub-title">{t("searchFilter.offers")}</p>

			<fieldset class="tags" oninput={filtersUpdated}>
				{#each offerMapping[selectedType] as offer (offer)}
					<TagCheckbox
						name="offers"
						bind:group={selectedOffers}
						value={offer}
						title={tEntry("offerDetails")[offer]}
					>
						{tEntry("offerMapping")[offer]}
					</TagCheckbox>
				{/each}
			</fieldset>
		{/if}

		{#if attributeMapping[selectedType]}
			<p class="sub-title">{t("searchFilter.more")}</p>

			<fieldset class="tags" oninput={filtersUpdated}>
				{#each attributeMapping[selectedType] as attribute (attribute)}
					<TagCheckbox
						name="attributes"
						bind:group={selectedAttributes}
						value={attribute}
						title={tEntry("attributeDetails")[attribute]}
					>
						{tEntry("attributeMapping")[attribute]}
					</TagCheckbox>
				{/each}
			</fieldset>
		{/if}

		<p class="sub-title">{t("searchFilter.textSearch")}</p>

		<div class="text-filter">
			<Input
				type="text"
				bind:value={textFilter}
				onchange={filtersUpdated}
				placeholder={t("searchFilter.textSearchPlaceholder")}
				class="text-input {textFilter ? 'has-text' : ''}"
				maxlength="120"
			/>

			<Button
				light
				iconOnly
				onclick={applyFilters}
				title={t("mouseOverTexts.filter")}
				class="search-button {textFilter ? '' : 'collapsed'}"
			>
				<Search />
			</Button>
		</div>

		<Button class="mobile filter-button" onclick={applyFilters} title={t("mouseOverTexts.filter")}>
			{t("searchFilter.filter")}
		</Button>
	</div>
</div>

<style lang="scss">
	@use "../../scss/mixins" as *;
	@use "../../scss/lengths" as *;

	.search-filter {
		width: min(300px, 30vw);
		min-width: min-content;
		display: flex;
		flex-direction: column;
		height: auto;

		align-self: start;
		position: sticky;
		justify-self: end;

		top: var(--scroll-y);
		padding-bottom: 20px;

		@include media-mobile {
			width: 100%;
			min-width: 0;
			position: relative;
			top: 0;
			justify-self: stretch;
		}

		:global(.mobile) {
			@include media-min-width($mobile-width) {
				display: none !important;
			}
		}

		:global(.desktop) {
			@include media-mobile {
				display: none !important;
			}
		}

		:global(.filter-button) {
			min-width: max-content;
			width: 100%;
			align-self: center;
		}

		.title {
			font-weight: 700;
			font-size: 0.9em;
		}
	}

	.bar {
		display: flex;
		align-items: flex-start;
		cursor: pointer;
		user-select: none;
		font-family: "Poppins", sans-serif;

		:global(.chevron) {
			transition: 0.2s ease transform;
			margin-right: 5px;
		}

		&.expand :global(.chevron) {
			transform: rotate(90deg);
		}
	}

	.filter {
		display: flex;
		flex-direction: column;

		@include media-mobile {
			transition: 0.2s ease all;

			&:not(.expand) {
				opacity: 0;

				animation: collapse-filters;
				animation-fill-mode: forwards;
				animation-delay: 0.2s;

				@keyframes collapse-filters {
					0% {
						height: auto;
					}
					100% {
						height: 0;
					}
				}
			}
		}

		.sub-title {
			font-weight: 500;
			font-family: "Poppins", sans-serif;
			margin: 10px 0 10px 0;
			font-size: 1.1em;
			display: flex;
			align-items: center;
			gap: 10px;
		}

		:global(.reset-location) {
			font-weight: 500;
			padding: 0 8px;
			min-height: unset;
			font-size: 0.8em;
		}

		.location {
			display: flex;
			align-items: center;
			gap: 10px;
			margin: 0;

			:global(.lucide) {
				color: var(--color-edge-highlight);
				stroke-width: 2.5px;
				height: 24px;
				width: 24px;
			}
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		fieldset {
			margin: 0 0 10px 0;
			padding: 0;
			border: 0;
		}

		.text-filter {
			position: relative;
			height: min-content;
			overflow: hidden;

			:global(label) {
				margin-bottom: 0;
			}

			@include media-mobile {
				margin-bottom: 20px;
			}

			:global(.search-button) {
				position: absolute;
				top: 6px;
				right: 6px;
				padding: 5.5px;
				transition:
					opacity 0.2s ease,
					right 0.2s ease;
				min-height: 0;
				min-width: 0;
			}

			:global(.search-button.collapsed) {
				opacity: 0;
				right: -32px;
				pointer-events: none;
			}

			:global(.text-input.has-text) {
				padding-right: 42px;
			}
		}
	}
</style>
