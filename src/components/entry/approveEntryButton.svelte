<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { BadgeCheck, CheckCircle } from "@lucide/svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import type { Entry } from "$models/entry.model";

	import { t } from "$lib/localization.svelte";
	import axios from "axios";
	import { apiRequestHandler } from "$lib/apiRequestHandler";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let loading = $state(false);

	async function approve() {
		loading = true;

		const result = await apiRequestHandler(
			axios.patch(`/manage/entries/${props.entry.id}/status`, { approved: true })
		);
		result.handleErrors({
			default: () => popupError("Fehler beim Freischalten")
		});

		loading = false;

		if (result.success) {
			popupOk("Eintrag freigeschaltet");
			props.onremove?.(props.entry);
		}
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
	<BadgeCheck />
</Button>
