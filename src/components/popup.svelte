<script lang="ts" context="module">	
	import { writable } from "svelte/store"
	import config from "$lib/config"
	
	let visible = writable(false);
	let type = writable("ok");
	let text = writable("");
	
	let id = 0;
	
	function popup(message: string, _type: string) {
		visible.set(true);
		text.set(message);
		type.set(_type);
		
		id += 1;
		let currentId = id;
		
		setTimeout(() => {
			// only run, if no new popups were called since timer started
			if (id === currentId) {
				visible.set(false);
			}
		}, config.client.popupLinger);
	}
	
	export function popupOk(message: string) {
		popup(message, "ok");
	}
	
	export function popupWarn(message: string) {
		popup(message, "warn");
	}
	
	export function popupError(message: string) {
		popup(message, "error");
	}
</script>

<script lang="ts">
	import AlertIcon from "lucide-icons-svelte/alertCircle.svelte"
	import CheckCircleIcon from "lucide-icons-svelte/checkCircle.svelte"
	import XCircleIcon from "lucide-icons-svelte/xCircle.svelte"
</script>

<div class="popup { $type } { $visible ? 'visible' : '' }" on:click={() => $visible = false}>
	{#if $type === "ok"}
		<CheckCircleIcon size="22px" />
	{:else if $type === "warn"}
		<AlertIcon size="22px" />
	{:else if $type === "error"}
		<XCircleIcon size="22px" />
	{/if}
	<span> { $text } </span>
</div>

<style lang="scss">
	@import "../scss/shadows";
	
	.popup {
		position: fixed;
		margin-left: auto;
		margin-right: auto;
		left: 16px;
		right: 16px;
		bottom: 82px;
		
		max-width: 380px;
		width: fit-content;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		
		padding: 10px 12px;
		border-radius: 4px;
		
		color: var(--color-edge-bright);
		box-shadow: $surface-shadow-soft;
		font-family: 'Fira Sans', sans-serif;
		font-size: 18px;
		
		pointer-events: none;
		
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s linear 1.4s, opacity 1.4s;
		
		&.visible {
			cursor: pointer;
			pointer-events: unset;
			
			visibility: visible;
			opacity: 1;
			transition: visibility 0s linear 0s, opacity 300ms;
		}
		
		&.ok {
			background-color: var(--color-popup-ok);
		}
		
		&.warn {
			background-color: var(--color-popup-warn);
		}
		
		&.error {
			background-color: var(--color-popup-error);
		}
		
		span {
			margin-left: 8px;
		}
		
		:global(.lucide) {
			min-width: 22px;
			min-height: 22px;
		}
	}
</style>
