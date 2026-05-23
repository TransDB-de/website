<script lang="ts">
	import LoginForm from "$components/forms/loginForm.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
</script>

<svelte:head>
	<title>Login - Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>Anmeldung für Teammitglieder</PrimaryHeading>
	<LoginForm />
</div>

<style lang="scss">
	@use "../../scss/content-small" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
