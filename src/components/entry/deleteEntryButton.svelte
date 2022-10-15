<script lang="ts">
	import Button from "$components/elements/button.svelte"
	import TrashIcon from "lucide-icons-svelte/trash.svelte"
	import { popupOk, popupError } from "$components/popup.svelte"
	import { confirm } from "$components/confirm.svelte"
	import type { Entry } from "$models/entry.model"
	
	import { t } from "$lib/localization"
	import { createEventDispatcher } from "svelte"
	
	import axios from "axios"
	
	const dispatch = createEventDispatcher();
	
	export let entry: Entry;
	let loading = false;
	
	async function deleteEntry() {
		let success: boolean = await confirm("Möchtest du diesen Eintrag wirklich löschen?");
		
		if (!success) return;
		loading = true;
		
		try {
			await axios.delete(`entries/${entry._id}`);
			popupOk("Eintrag gelöscht");
			dispatch("remove", entry);
		} catch (e) {
			popupError("Unbekannter fehler beim Löschen");
		}
		
		loading = false;
	}
</script>

<Button light iconOnly color="edge-error" on:click={ deleteEntry } title={ $t("mouseOverTexts.deleteEntry") } { loading }>
	<TrashIcon />
</Button>
