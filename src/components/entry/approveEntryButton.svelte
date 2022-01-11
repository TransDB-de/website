<script lang="ts">
	import Button from "$components/elements/button.svelte"
	import CheckCircleIcon from "lucide-icons-svelte/checkCircle.svelte"
	import { popupOk, popupError } from "$components/popup.svelte"
	import type { Entry } from "$models/entry.model"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { createEventDispatcher } from "svelte"

	import axios from "axios"
	
	const dispatch = createEventDispatcher();

	export let entry: Entry;
	let loading = false;
	
	async function approve() {
		loading = true;
		try {
			await axios.patch(`/entries/${entry._id}/approve`);
			popupOk("Eintrag freigeschaltet");
			dispatch("remove", entry);
		} catch (e) {
			popupError("Fehler beim Freischalten");
		}
		
		loading = false;
	}
</script>

<Button light iconOnly color="edge-highlight" title={ mouseOverTexts["approveEntry"] } on:click={ approve } { loading }>
	<CheckCircleIcon />
</Button>