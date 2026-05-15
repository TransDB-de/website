<script lang="ts">
	import Button from "$components/elements/button.svelte";
	import { Flag } from "@lucide/svelte";
	import { popupWarn, popupError } from "$components/popup.svelte";
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

	async function blocklist() {
		let confirmed = await confirm("Möchtest du diesen Eintrag wirklich auf die Blocklist setzen?");
		if (!confirmed) return;

		loading = true;
		try {
			await axios.patch(`/entries/${props.entry._id}/blocklist`);
			popupWarn("Der Eintrag wurde auf die Blocklist gesetzt");
			props.onremove?.(props.entry);
		} catch (e) {
			popupError("Fehler beim Blocklisten des Eintrags");
		}

		loading = false;
	}
</script>

<Button light iconOnly title={t("mouseOverTexts.blocklistEntry")} onclick={blocklist} {loading}>
	<Flag />
</Button>
