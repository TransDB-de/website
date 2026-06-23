<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Flag } from "@lucide/svelte";
	import { popupWarn, popupError } from "$components/popup.svelte";
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
				blocked: true,
				comment
			})
		);
		result.handleErrors({
			default: () => popupError("Fehler beim Blocklisten des Eintrags")
		});

		loading = false;

		if (result.success) {
			popupWarn("Der Eintrag wurde auf die Blocklist gesetzt");
			props.onremove?.(props.entry);
		}
	}
</script>

<Button light iconOnly title={t("mouseOverTexts.blocklistEntry")} onclick={() => (open = true)} {loading}>
	<Flag />
</Button>

<Dialog bind:open title="Eintrag blocklisten" onclose={handleClose}>
	<Textarea label="Begründung" name="comment" required placeholder="Warum wird dieser Eintrag geblockt?" />
	{#snippet actions()}
		<Button type="submit" value="cancel" formnovalidate>Abbrechen</Button>
		<Button type="submit" value="confirm" color="red">Blocklisten</Button>
	{/snippet}
</Dialog>
