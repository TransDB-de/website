<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Archive } from "@lucide/svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import Dialog from "$components/dialog.svelte";
	import Textarea from "$components/forms/elements/textarea.svelte";
	import type { Entry } from "$models/entry.model";

	import { t } from "$lib/localization.svelte";
	import axios from "axios";
	import { apiRequestHandler } from "$lib/apiRequestHandler";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let open = $state(false);
	let loading = $state(false);

	async function handleClose(returnValue: string, formData: FormData | null) {
		if (returnValue !== "confirm") return;

		const comment = formData?.get("comment") as string;
		loading = true;

		const result = await apiRequestHandler(
			axios.patch(`/admin/entries/${props.entry.id}/status`, {
				archived: true,
				comment
			})
		);
		result.handleErrors({
			default: () => popupError("Fehler beim Archivieren des Eintrags")
		});

		loading = false;

		if (result.success) {
			popupOk("Eintrag archiviert");
			props.onremove?.(props.entry);
		}
	}
</script>

<Button
	light
	iconOnly
	color="edge-warn"
	title={t("mouseOverTexts.archiveEntry")}
	onclick={() => (open = true)}
	{loading}
>
	<Archive />
</Button>

<Dialog bind:open title="Eintrag archivieren" onclose={handleClose}>
	<Textarea
		label="Begründung"
		name="comment"
		required
		placeholder="Warum wird dieser Eintrag archiviert?"
	/>
	{#snippet actions()}
		<Button type="submit" value="cancel" formnovalidate>Abbrechen</Button>
		<Button type="submit" value="confirm" color="red">Archivieren</Button>
	{/snippet}
</Dialog>
