<script lang="ts">
	import UpdatePasswordForm from "$components/forms/updatePasswordForm.svelte"
	import UpdateUsernameForm from "$components/forms/updateUsernameForm.svelte"
	import UpdateEmailForm from "$components/forms/updateEmailForm.svelte"
	
	import { userdata } from "$lib/store"
	import { t } from "$lib/localization"
</script>

<div class="content">
	<h1>{ t("manage.accountSettings") }</h1>
	
	<UpdatePasswordForm />
	<UpdateUsernameForm username={$userdata?.username} />
	<UpdateEmailForm email={$userdata?.email} />
</div>

<style lang="scss">
	@import "../../scss/content-small";
</style>
