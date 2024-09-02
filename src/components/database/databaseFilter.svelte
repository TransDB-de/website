<script lang="ts">
	import { page } from "$app/stores";

	import Button from "$components/elements/button.svelte";
	import { filters } from "$lib/filterLang.client";
	import { language } from "$lib/filterLang.client";
	import { clamp } from "$lib/utils";
	import { onMount } from "svelte";

	let focused = false;
	let input = "";
	let selectedSuggestion = "";

	let suggestions: string[] = [];
	$: suggestions = getAutocomplete(input);

	let dropdownVisible = false;
	$: dropdownVisible = suggestions.length > 0 && focused;

	let dropdown: HTMLUListElement;
	let suggestionElements: HTMLLIElement[] = [];

	let filterElement: HTMLDivElement;

	// Random Suggestion
	let randomSuggestion = "";
	$: {
		if (input === "") randomSuggestion = getRandomSuggestion();
	}

	$filters = {};

	if ($page.url.searchParams.has("id")) {
		input = `id: ${$page.url.searchParams.get("id")}`;
		$filters = language.parse(input);

		console.log("Filter bar");
	}

	function getRandomSuggestion() {
		let arr = Object.keys(language.filters);
		let rnd = Math.floor(Math.random() * arr.length);
		return `Freitext oder Filter. Versuche "${arr[rnd]}: ..."`;
	}

	// fetches an array of autocomplete suggestions
	function getAutocomplete(input: string): string[] {
		let details = language.liveParse(input);
		let autoComp = details.autocomplete;

		if (!autoComp.includes(selectedSuggestion)) {
			selectedSuggestion = "";
		}

		return autoComp;
	}

	function keyDown(event: KeyboardEvent) {
		if (event.code === "ArrowUp") keyPress(event, true);
		else if (event.code === "ArrowDown") keyPress(event, false);
		else if (event.code === "ArrowRight") input += selectedSuggestion;
		else if (event.code === "Enter") {
			if (selectedSuggestion) {
				input += selectedSuggestion;
			} else {
				filter();
			}
		}
	}

	function keyPress(event: KeyboardEvent, up: boolean) {
		if (!suggestions || suggestions === []) return;

		event.preventDefault();

		let index: number;

		if (selectedSuggestion === "") {
			index = 0;
		} else {
			index = suggestions.indexOf(selectedSuggestion);
			index += up ? -1 : 1;
			index = clamp(index, 0, suggestions.length - 1);
		}

		selectedSuggestion = suggestions[index];
		scrollToSelectedIndex(index);
	}

	function scrollToSelectedIndex(index: number) {
		if (!suggestionElements || suggestionElements === []) return;

		const scrollMargin = 20;
		let selectedElement = suggestionElements[index];

		if (selectedElement) {
			let { offsetHeight, scrollTop } = dropdown;

			dropdown.scrollTop = clamp(
				scrollTop,
				selectedElement.offsetTop + selectedElement.offsetHeight - offsetHeight + scrollMargin,
				selectedElement.offsetTop - scrollMargin
			);
		}
	}

	async function bodyClick(event: MouseEvent) {
		if (!filterElement.contains(event.target as Node)) {
			focused = false;
		}
	}

	function filter() {
		$filters = language.parse(input);
		filters.filter();
	}
</script>

<svelte:body on:click={bodyClick} />

<div class="text-filter" bind:this={filterElement}>
	<div class="autocomplete">
		<input
			type="text"
			placeholder={randomSuggestion}
			bind:value={input}
			on:focus={() => (focused = true)}
			on:keydown={keyDown}
		/>

		<ul class="dropdown" class:dropdownVisible bind:this={dropdown}>
			{#each suggestions as suggestion, index}
				<li
					on:click={() => (input += suggestion)}
					bind:this={suggestionElements[index]}
					class={suggestion === selectedSuggestion ? "selected" : ""}
				>
					<span class="input">{input}</span><span class="suggestion">{suggestion}</span>
				</li>
			{/each}
		</ul>
	</div>

	<Button on:click={filter}>Filtern</Button>
</div>

<style lang="scss">
	@import "../../scss/input";

	.text-filter {
		display: grid;
		grid-template-columns: 1fr auto;
		max-width: 850px;
		width: 100%;
		align-self: center;
		gap: 10px;

		.autocomplete {
			position: relative;
			width: 100%;
		}

		input {
			@include input-box;
			@include input-font;

			padding: 6px 12px;
			width: 100%;
			height: 40px;
		}

		.dropdown {
			position: absolute;
			z-index: 1;
			top: 36px;
			width: 100%;
			max-height: 200px;
			overflow: auto;
			background-color: var(--color-background);

			font-family: "Poppins", sans-serif;
			font-size: 18px;

			margin: 0;
			padding: 0;
			border: 2px solid var(--color-rim-active);
			border-top: 0;
			border-radius: 0 0 4px 4px;

			visibility: hidden;

			&.dropdownVisible {
				visibility: inherit;
			}

			li {
				list-style: none;
				cursor: pointer;
				white-space: nowrap;
				overflow-x: hidden;
				padding: 0 12px;
				scroll-snap-type: y mandatory;

				&:hover {
					background-color: var(--color-background-dimmed);
				}

				&.selected {
					background-color: var(--color-surface-highlight);
				}

				.user-input {
					color: var(--color-edge-dimmed);
				}

				.suggestion {
					color: var(--color-edge-highlight);
				}

				&.selected > .suggestion {
					color: var(--color-edge-bright);
				}
			}
		}
	}
</style>
