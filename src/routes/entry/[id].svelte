<script lang="ts">
	import SingleEntryView from "$components/singleEntryView.svelte";
	
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.content
		SingleEntryView(id="{$page.params.id}")
</template>

<style lang="scss">
	@import "../../scss/content";
</style>