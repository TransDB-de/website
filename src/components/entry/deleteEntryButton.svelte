<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Trash } from "@lucide/svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import { confirm } from "$components/confirm.svelte";
	import type { Entry } from "$models/entry.model";

	import { t } from "$lib/localization.svelte";
	import axios from "axios";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let loading = $state(false);

	async function deleteEntry() {
		let success: boolean = await confirm("Möchtest du diesen Eintrag wirklich löschen?");

		if (!success) return;
		loading = true;

		try {
			await axios.delete(`entries/${props.entry._id}`);
			popupOk("Eintrag gelöscht");
			props.onremove?.(props.entry);
		} catch (e) {
			popupError("Unbekannter fehler beim Löschen");
		}

		loading = false;
	}
</script>

<Button
	light
	iconOnly
	color="edge-error"
	onclick={deleteEntry}
	title={t("mouseOverTexts.deleteEntry")}
	{loading}
>
	<Trash />
</Button>
