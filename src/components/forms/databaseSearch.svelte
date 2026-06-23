<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import { goto } from "$app/navigation";

	let text = $state("");

	async function submit() {
		const url = new URL(window.location.href);
		if (text.length > 0) {
			url.searchParams.set("text", text);
		} else {
			url.searchParams.delete("text");
		}
		goto(url.toString());
	}
</script>

<Form onsubmit={submit}>
	<section>
		<Input
			bind:value={text}
			label="Volltextsuche für Einträge"
			placeholder="Suche nach Einträgen..."
			maxlength="1000"
		/>
	</section>
</Form>

<style lang="scss">
	section {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
	}
</style>
