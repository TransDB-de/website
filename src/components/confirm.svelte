<script module lang="ts">
	let open = $state(false);
	let messageText = $state("");
	let confirmDestructive = $state(true);
	let resolveConfirm: ((value: boolean) => void) | null = null;

	export async function confirm(message: string, destructive: boolean = true): Promise<boolean> {
		messageText = message;
		confirmDestructive = destructive;
		open = true;
		return new Promise<boolean>((resolve) => {
			resolveConfirm = resolve;
		});
	}
</script>

<script lang="ts">
	import Dialog from "$components/dialog.svelte";
	import Button from "$components/elements/button.svelte";

	function handleClose(returnValue: string) {
		resolveConfirm?.(returnValue === "confirm");
		resolveConfirm = null;
	}
</script>

<Dialog bind:open title={messageText} onclose={handleClose}>
	{#snippet actions()}
		<Button type="submit" value="confirm" color={confirmDestructive ? "red" : ""}>Ja</Button>
		<Button type="submit" value="cancel" color={confirmDestructive ? "" : "red"}>Nein</Button>
	{/snippet}
</Dialog>
