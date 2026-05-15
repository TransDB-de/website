<script module lang="ts">
	import { writable } from "svelte/store";
	import { env } from "$env/dynamic/public";
	import { timeout } from "$lib/utils";

	const visible = writable(false);
	const type = writable("ok");
	const text = writable("");

	const popupLinger = env.PUBLIC_POPUP_LINGER ? Number(env.PUBLIC_POPUP_LINGER) * 1000 : 4000;

	let id = 0;

	async function popup(message: string, _type: string) {
		visible.set(true);
		text.set(message);
		type.set(_type);

		id += 1;
		let currentId = id;

		await timeout(popupLinger);

		if (id === currentId) {
			visible.set(false);
		}
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
	import { AlertCircle, CheckCircle, XCircle } from "@lucide/svelte";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="popup {$type} {$visible ? 'visible' : ''}" onclick={() => ($visible = false)}>
	{#if $type === "ok"}
		<CheckCircle size={22} />
	{:else if $type === "warn"}
		<AlertCircle size={22} />
	{:else if $type === "error"}
		<XCircle size={22} />
	{/if}
	<span> {$text} </span>
</div>

<style lang="scss">
	@use "../scss/shadows" as *;

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
		font-family: "Fira Sans", sans-serif;
		font-size: 18px;
		pointer-events: none;
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 0s linear 1.4s,
			opacity 1.4s;

		&.visible {
			cursor: pointer;
			pointer-events: unset;
			visibility: visible;
			opacity: 1;
			transition:
				visibility 0s linear 0s,
				opacity 300ms;
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
