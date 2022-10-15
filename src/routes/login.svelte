<script lang="ts">
	import LoginForm from "$components/forms/loginForm.svelte"
	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>Login - Trans*DB</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.content
		LoginForm
</template>

<style lang="scss">
	@import "../scss/content-small";
</style>
