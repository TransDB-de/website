<script lang="ts">
	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>{ $t("report.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.content
		ReportForm
</template>

<style lang="scss">
	@import "../scss/content";
</style>
