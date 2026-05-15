<script lang="ts">
	import { Languages } from "@lucide/svelte";
	import { locales, currentLocale, localeMappings, setLocale } from "$lib/localization";

	function onSelectChanged(event: Event) {
		const target = event.target as HTMLSelectElement;
		setLocale(target.value);
	}
</script>

<div class="locale-switcher">
	<Languages size={25} />

	<select value={currentLocale} onchange={onSelectChanged}>
		{#each locales as locale}
			<option value={locale} selected={currentLocale === locale}>
				{(localeMappings as Record<string, string>)[locale]}
			</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.locale-switcher {
		all: unset;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		position: relative;
		border: none;
		user-select: none;

		select {
			all: unset;
			padding-left: calc(25px + 0.25rem);
			font-weight: 500;
			text-align: left;
		}

		:global(.lucide) {
			position: absolute;
			left: 0;
			pointer-events: none;
		}
	}
</style>
