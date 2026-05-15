<script lang="ts">
	import type { PageData } from "./$types";
	import { t } from "$lib/localization";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>{t("imprint.title")}</title>
	<meta name="description" content={t("imprint.description")} />
</svelte:head>

<div class="content">
	<props.data.ImprintContent />
	<props.data.DisclaimerContent />
	<props.data.EntryRemovalContent />
</div>

<style lang="scss">
	@use "../../scss/content" as *;
</style>
