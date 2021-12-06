<script lang="ts">
	import UpdatePasswordForm from "$components/forms/updatePasswordForm.svelte"
	import UpdateUsernameForm from "$components/forms/updateUsernameForm.svelte"
	import UpdateEmailForm from "$components/forms/updateEmailForm.svelte"
	
	import { userdata } from "$lib/store"
</script>

<template lang="pug">
	div.content
		h1 Account Einstellungen
		UpdatePasswordForm
		UpdateUsernameForm(username="{$userdata?.username}")
		UpdateEmailForm(email="{$userdata?.email}")
</template>

<style lang="scss">
	@import "../../scss/content-small";
</style>
