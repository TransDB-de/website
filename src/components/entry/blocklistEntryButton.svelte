<script lang="ts">
	import Button from "$components/elements/button.svelte"
	import FlagIcon from "lucide-icons-svelte/flag.svelte"
	import { popupWarn, popupError } from "$components/popup.svelte"
	import { confirm } from "$components/confirm.svelte"
	import type { Entry } from "$models/entry.model"
	
	import { t } from "$lib/localization"
	import { createEventDispatcher } from "svelte"

	import axios from "axios"
	
	const dispatch = createEventDispatcher();
	
	export let entry: Entry;
	let loading = false;
	
	async function blocklist() {
		let confirmed = await confirm("Möchtest du diesen Eintrag wirklich auf die Blocklist setzen?");
		if (!confirmed) return;
		
		loading = true;
		try {
			await axios.patch(`/entries/${entry._id}/blocklist`);
			popupWarn("Der Eintrag wurde auf die Blocklist gesetzt");
			dispatch("remove", entry);
		} catch (e) {
			popupError("Fehler beim Blocklisten des Eintrags");
		}
		
		loading = false;
	}
</script>

<Button light iconOnly title={ $t("mouseOverTexts.blocklistEntry") } on:click={ blocklist } { loading }>
	<FlagIcon />
</Button>