<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		open = $bindable(false),
		title,
		children,
		actions,
		onclose
	}: {
		open?: boolean;
		title?: string;
		children?: Snippet;
		actions?: Snippet;
		onclose?: (returnValue: string, formData: FormData | null) => void;
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	let form: HTMLFormElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open) {
			dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	});

	function handleClose() {
		open = false;
		onclose?.(dialog?.returnValue ?? "", form ? new FormData(form) : null);
	}
</script>

<dialog bind:this={dialog} onclose={handleClose}>
	<div class="modal">
		{#if title}
			<h2>{title}</h2>
		{/if}
		<form method="dialog" bind:this={form}>
			{@render children?.()}
			{#if actions}
				<section class="actions">
					{@render actions()}
				</section>
			{/if}
		</form>
	</div>
</dialog>

<style lang="scss">
	@use "../scss/shadows" as *;

	dialog {
		border: none;
		padding: 0;
		color: inherit;
		max-width: unset;
		max-height: unset;
		display: flex;
		align-items: center;
		justify-content: center;
		visibility: hidden;
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		user-select: none;
		background-color: rgba(0, 0, 0, 0.2);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		opacity: 0;
		transition:
			opacity 0.2s,
			visibility 0s linear 0.2s;

		&[open] {
			visibility: visible;
			opacity: 1;
			pointer-events: unset;
			user-select: text;
			transition: opacity 0.2s;
		}

		&::backdrop {
			background: none;
		}

		.modal {
			display: flex;
			flex-direction: column;
			gap: 20px;
			padding: 20px;
			border-radius: 4px;
			background-color: var(--color-background);
			box-shadow: $surface-shadow-soft;
			min-width: 300px;
			max-width: 500px;
			transform: scale(0.9);
			transition: transform 0.2s;

			h2 {
				font-weight: 500;
				text-align: center;
				margin: 0;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 12px;
			}

			.actions {
				display: flex;
				gap: 10px;
				justify-content: center;
				margin-top: 8px;
			}
		}

		&[open] .modal {
			transform: none;
		}
	}
</style>
