<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Archive } from "@lucide/svelte";
	import { popupError, popupWarn } from "$components/popup.svelte";
	import { prompt } from "$components/prompt.svelte";
	import type { Entry } from "$models/entry.model";
	import { t } from "$lib/localization.svelte";
	import axios from "axios";
	import { apiRequestHandler } from "$lib/apiRequestHandler";

	interface Props {
		entry: Entry;
		onchange?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let loading = $state(false);

	async function archive() {
		const reason = await prompt("Eintrag archivieren?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag archiviert werden?",
			required: true,
			destructive: true
		});

		if (!reason) return;

		loading = true;

		const result = await apiRequestHandler(
			axios.patch(`/manage/entries/${props.entry.id}/status`, {
				archived: true,
				comment: reason
			})
		);

		result.handleErrors({
			default: () => popupError("Fehler beim Archivieren")
		});

		loading = false;

		if (result.success) {
			props.entry.status!.archived = true;
			popupWarn("Eintrag archiviert");
			props.onchange?.(props.entry);
		}
	}
</script>

{#if !props.entry.status?.archived}
	<Button light iconOnly color="edge-warn" title="Eintrag archivieren" onclick={archive} {loading}>
		<Archive />
	</Button>
{/if}
