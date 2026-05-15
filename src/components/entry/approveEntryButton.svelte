<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { CheckCircle } from "@lucide/svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import type { Entry } from "$models/entry.model";

	import { t } from "$lib/localization";
	import axios from "axios";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let loading = $state(false);

	async function approve() {
		loading = true;
		try {
			await axios.patch(`/entries/${props.entry._id}/approve`);
			popupOk("Eintrag freigeschaltet");
			props.onremove?.(props.entry);
		} catch (e) {
			popupError("Fehler beim Freischalten");
		}

		loading = false;
	}
</script>

<Button
	light
	iconOnly
	color="edge-highlight"
	title={t("mouseOverTexts.approveEntry")}
	onclick={approve}
	{loading}
>
	<CheckCircle />
</Button>
