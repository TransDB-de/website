<script lang="ts">
	import HelpCircleIcon from "lucide-icons-svelte/helpCircle.svelte"
	import DownloadIcon from "lucide-icons-svelte/download.svelte"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import Button from "$components/elements/button.svelte"
	import { popupError } from "$components/popup.svelte";
	
	import axios from "axios"
	
	async function downloadBackup() {
		try {
			const res = await axios.get(`entries/backup`);
			const data = new Blob([JSON.stringify(res.data)], { type: "application/json" });
			const url = window.URL.createObjectURL(data);
			const link = document.createElement("a");
			const date = new Date();
			const fileStr = `transdb_backup_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}h${date.getMinutes()}.json`;
			link.href = url;
			link.setAttribute("download", fileStr);	
			
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch(e) {
			console.error(e);
			if (e.response) {
				popupError(`Unbekannter Fehler! Datenbank konnte nicht heruntergeladen werden (${e.response.status})`);
			} else {
				popupError(`Unbekannter Fehler! Bitte Developer kontaktieren`);
			}
		}
	}
</script>

<div>
	<a class="light" title={ mouseOverTexts["databaseHelp"] } href="/manage/help">
		<HelpCircleIcon /> Hilfe
	</a>
	
	<Button light title={ mouseOverTexts["backup"] } on:click={ downloadBackup }>
		<DownloadIcon /> Backup herunterladen
	</Button>
</div>

<style lang="scss">
	@import "../../scss/button";
	
	div {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
		
		a {
			@include button;
			text-decoration: none;
		}
	}
	
</style>
