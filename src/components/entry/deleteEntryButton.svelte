<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Trash } from "@lucide/svelte";
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
		withText?: boolean;
	}

	const props: Props = $props();

	let open = $state(false);
	let loading = $state(false);

	async function handleClose(returnValue: string, formData: FormData | null) {
		if (returnValue !== "confirm") return;

		const comment = formData?.get("comment") as string;
		loading = true;

		const result = await apiRequestHandler(
			axios.delete(`/admin/entries/${props.entry.id}`, { data: { comment } })
		);
		result.handleErrors({
			default: () => popupError("Fehler beim Löschen des Eintrags")
		});

		loading = false;

		if (result.success) {
			popupOk("Eintrag gelöscht");
			props.onremove?.(props.entry);
		}
	}
</script>

<Button
	light
	iconOnly={!props.withText}
	color="edge-error"
	onclick={() => (open = true)}
	title={t("mouseOverTexts.deleteEntry")}
	{loading}
>
	<Trash />
</Button>
