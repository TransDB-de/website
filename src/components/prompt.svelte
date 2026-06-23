<script module lang="ts">
	let open = $state(false);
	let titleText = $state("");
	let labelText = $state("");
	let placeholderText = $state("");
	let isDestructive = $state(false);
	let isRequired = $state(true);
	let resolvePrompt: ((value: string | null) => void) | null = null;

	export async function prompt(
		title: string,
		options: { label?: string; placeholder?: string; destructive?: boolean; required?: boolean } = {}
	): Promise<string | null> {
		titleText = title;
		labelText = options.label ?? "";
		placeholderText = options.placeholder ?? "";
		isDestructive = options.destructive ?? false;
		isRequired = options.required ?? true;
		open = true;
		return new Promise<string | null>((resolve) => {
			resolvePrompt = resolve;
		});
	}
</script>

<script lang="ts">
	import Dialog from "$components/dialog.svelte";
	import Button from "$components/elements/button.svelte";
	import Textarea from "$components/forms/elements/textarea.svelte";

	let comment = $state("");

	function handleClose(returnValue: string, formData: FormData | null) {
		if (returnValue === "confirm") {
			resolvePrompt?.(formData?.get("comment") as string ?? "");
		} else {
			resolvePrompt?.(null);
		}
		resolvePrompt = null;
		comment = "";
	}
</script>

<Dialog bind:open title={titleText} onclose={handleClose}>
	<Textarea name="comment" label={labelText} placeholder={placeholderText} required={isRequired} bind:value={comment} />
	{#snippet actions()}
		<Button type="submit" value="cancel" formnovalidate>Abbrechen</Button>
		<Button type="submit" value="confirm" color={isDestructive ? "red" : ""}>Bestätigen</Button>
	{/snippet}
</Dialog>
