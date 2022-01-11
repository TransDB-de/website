<script lang="ts">
	import UserCollection from "$components/userCollection.svelte";
	import CreateUserForm from "$components/forms/createUserForm.svelte";
</script>

<template lang="pug">
	div.content
		h2 Benutzer hinzufügen
		CreateUserForm
		
		h2 Benutzerliste
		UserCollection
</template>

<style lang="scss">
	@import "../../scss/content-small";
	
	.content {
		padding: 20px 10px;
	}
</style>
