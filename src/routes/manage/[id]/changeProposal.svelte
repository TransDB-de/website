<script lang="ts">
	import { ChartLine, FileText, Link2, MessageSquareQuote, Tags, Undo2 } from "@lucide/svelte";
	import { env } from "$env/dynamic/public";
	import { t } from "$lib/localization.svelte";
	import { usercache } from "$lib/store";
	import Button from "$components/elements/button.svelte";
	import type { EntryChangeProposal } from "$models/proposal.model";

	interface Props {
		changeProposal: EntryChangeProposal;
		showEntry?: boolean;
	}

	let { changeProposal, showEntry }: Props = $props();

	let timestamp = $derived(
		changeProposal.timestamp
			? new Intl.DateTimeFormat("de-DE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				}).format(new Date(changeProposal.timestamp))
			: null
	);

	let username = $derived(
		changeProposal.userId && $usercache
			? $usercache.find((u) => u.id === changeProposal.userId)?.name
			: null
	);
</script>

<article class="changeProposal-item">
	<header>
		<div>
			<h3>
				{timestamp}
			</h3>

			{#if username}
				<span class="user">von <b>{username}</b></span>
			{/if}
		</div>
	</header>

	{#if changeProposal.changeProposal.comment}
		<p title="Kommentar/Grund">
			<MessageSquareQuote size={20} />
			<span>
				{changeProposal.changeProposal.comment}
			</span>
		</p>
	{/if}
</article>

<style lang="scss">
	@use "../../../scss/shadows" as *;

	article.changeProposal-item {
		display: flex;
		flex-direction: column;
		gap: 7px;
		border-radius: 4px;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;

		header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			border-radius: 4px 4px 0 0;
			padding: 7px 12px;

			div {
				display: flex;
				gap: 0.5rem;
				align-items: center;
				flex-wrap: wrap;
			}

			h3 {
				margin: 0;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 1rem;

				:global(.lucide) {
					stroke-width: 2.5;
				}
			}

			.report-type {
				font-weight: 500;
			}
		}

		&:has(p) header {
			border-bottom: 2px dotted var(--color-edge-light);
		}

		p {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 0.3rem;
			margin: 0;
			padding-left: 12px;
			padding-right: 7px;

			&:first-of-type {
				padding-top: 0px;
			}

			&:last-of-type {
				padding-bottom: 10px;
			}

			span {
				display: inline-flex;
			}

			:global(.lucide) {
				stroke-width: 2.5;
				height: 20px;
				width: 20px;
			}

			b {
				font-weight: 600;
			}

			a {
				color: var(--color-edge-highlight);
				font-weight: 500;
				justify-self: start;

				&.local-entry-link {
					color: inherit;
				}
			}
		}
	}

	.icon-circle {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background-color: var(--color-background-dimmed);

		:global(.lucide) {
			stroke-width: 2.5;
			color: var(--icon-color);
		}
	}

	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.header {
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
	}

	.type {
		font-weight: 600;
	}

	.timestamp {
		opacity: 0.65;
		font-weight: 500;
		font-size: 0.92rem;
		margin-left: auto;
		text-align: right;
	}

	.attachments {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 4px;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.78rem;
		padding: 2px 8px;
		border-radius: 4px;
		background-color: var(--color-background-dimmed);
		color: var(--color-edge);
		text-decoration: none;

		&.warn {
			background-color: var(--color-special-warn);
			color: var(--color-edge);
		}

		&.link {
			color: var(--color-edge-highlight);
			background-color: color-mix(in srgb, var(--color-edge-highlight) 10%, transparent);

			&:hover {
				text-decoration: underline;
			}
		}

		&.muted {
			color: var(--color-edge-dimmed);
			font-family: monospace;
		}
	}

	.probability {
		font-weight: 600;
	}
</style>
