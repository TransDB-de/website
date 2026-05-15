<script lang="ts">
	import type { PageData } from "./$types";
	import { t } from "$lib/localization";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>{t("privacy.title")}</title>
	<meta name="description" content={t("privacy.description")} />
</svelte:head>

<div class="content">
	<props.data.PrivacyContent />
	<props.data.DisclaimerContent />
	<props.data.EntryRemovalContent />
</div>

<style lang="scss">
	@use "../../scss/content" as *;
</style>
