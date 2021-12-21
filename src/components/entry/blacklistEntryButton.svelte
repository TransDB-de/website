<script lang="ts">
	import Button from "$components/elements/button.svelte"
	import FlagIcon from "lucide-icons-svelte/flag.svelte"
	import { popupWarn, popupError } from "$components/popup.svelte"
	import { confirm } from "$components/confirm.svelte"
	import type { Entry } from "$models/entry.model"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { createEventDispatcher } from "svelte"

	import axios from "axios"
	
	const dispatch = createEventDispatcher();
	
	export let entry: Entry;
	let loading = false;
	
	async function blacklist() {
		let confirmed = await confirm("Möchtest du diesen Eintrag wirklich auf die Blacklist setzen?");
		if (!confirmed) return;
		
		loading = true;
		try {
			await axios.patch(`/entries/${entry._id}/blacklist`);
			popupWarn("Der Eintrag wurde auf die Blacklist gesetzt");
			dispatch("remove", entry);
		} catch (e) {
			popupError("Fehler beim Blacklisten des Eintrags");
		}
		
		loading = false;
	}
</script>

<Button light iconOnly title={ mouseOverTexts["blacklistEntry"] } on:click={ blacklist } { loading }>
	<FlagIcon />
</Button>