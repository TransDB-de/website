<script lang="ts">
	import UserCollection from "$components/userCollection.svelte";
	import CreateUserForm from "$components/forms/createUserForm.svelte";
    import { t } from "$lib/localization";
</script>

<div class="content">
	<h2>
		{ t("manage.addUser") }
	</h2>
	<CreateUserForm />

	<h2>
		{ t("manage.userList") }
	</h2>
	<UserCollection />
</div>

<style lang="scss">
	@import "../../scss/content-small";
	
	.content {
		padding: 20px 10px;
	}
</style>
