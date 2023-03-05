<script lang="ts">
	import LoginForm from "$components/forms/loginForm.svelte"
	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>Login - Trans*DB</title>
	<meta name="robots" content="noindex">
</svelte:head>

<div class="content">
	<LoginForm />
</div>

<style lang="scss">
	@import "../scss/content-small";
</style>
