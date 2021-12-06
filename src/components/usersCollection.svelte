<script lang="ts" context="module">
	import { writable } from "svelte/store"
	import { popupError } from "$components/popup.svelte"
	
	let users = writable<User[]>([]);
	let loading = writable<boolean>(false);;
	
	export async function fetchUsers() {
		loading.set(true);
		
		try {
			let res = await axios.get<User[]>("users")
			users.set(res.data);
		} catch(e) {
			popupError(`Fehler beim Laden (${e.response.status})`);
		} finally {
			loading.set(false);
		}
	}
</script>

<script lang="ts">
	import { onMount } from "svelte"
	import axios from "axios"
	
	import type { User } from "$models/user.model"
	
	import UserComponent from "$components/user.svelte"
	import LoadMore from "$components/loadMore.svelte"
	
	onMount(() => fetchUsers());
</script>

<div class="users-collection">
	{#each $users as user (user._id)}
		<UserComponent user={user} />
	{/each}
	
	{#if $users.length < 1}
		<LoadMore loading= {true} />
	{/if}
</div>

<style lang="scss">
	div.users-collection {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
