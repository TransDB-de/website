<script lang="ts">
	import {
		Bot,
		ChartLine,
		FileText,
		HeartHandshake,
		Link2,
		MessageSquareQuote,
		SquareAsterisk,
		SquareCheck,
		SquareX,
		Tags,
		Undo2,
		User
	} from "@lucide/svelte";
	import { env } from "$env/dynamic/public";
	import { t } from "$lib/localization.svelte";
	import { usercache } from "$lib/store";
	import Button from "$components/elements/button.svelte";
	import {
		type EntryChangeProposal,
		type PublicEntryChangeProposal,
		EDataOrigin,
		EEntryChangeProposalStatus
	} from "$models/proposal.model";
	import { renderTextareaContent } from "$lib/utils";
	import type { Entry } from "$models/entry.model";

	interface Props {
		proposal: PublicEntryChangeProposal;
		showEntry?: boolean;
	}

	let { proposal, showEntry }: Props = $props();

	let timestamp = $derived(
		proposal.timestamp
			? new Intl.DateTimeFormat("de-DE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				}).format(new Date(proposal.timestamp))
			: null
	);

	let username = $derived(
		proposal.userId && $usercache ? $usercache.find((u) => u.id === proposal.userId)?.name : null
	);

	const statusMapping = {
		[EEntryChangeProposalStatus.Open]: {
			icon: SquareAsterisk,
			name: "Offen",
			color: "edge-highlight"
		},
		[EEntryChangeProposalStatus.Accepted]: {
			icon: SquareCheck,
			name: "Angenommen",
			color: "edge-success"
		},
		[EEntryChangeProposalStatus.Rejected]: {
			icon: SquareX,
			name: "Abgelehnt",
			color: "edge-warn"
		}
	};

	const dataOriginMapping = {
		[EDataOrigin.User]: {
			icon: HeartHandshake,
			name: "Community"
		},
		[EDataOrigin.Member]: {
			icon: User,
			name: "Teammitglied"
		},
		[EDataOrigin.Machine]: {
			icon: Bot,
			name: "Maschine"
		}
	};

	const status = $derived.by(() => statusMapping[proposal.status]);
	const origin = $derived.by(() => dataOriginMapping[proposal.origin]);

	let formattedComment = $derived(renderTextareaContent(proposal.comment ?? ""));
</script>

<article>
	<header>
		<a href={`/manage/${proposal.entryId}/proposals/${proposal.id}`}>
			<h3>
				{timestamp} &nbsp;
				<span class="short-id">#{proposal.snowflakeId}</span>
			</h3>
		</a>
	</header>

	{#if showEntry}
		<p class="link" title="Der Eintrag, zu dem diese Aktivität gehört">
			<FileText size={20} />

			<a
				href={`/manage/${proposal.entryId}`}
				target="_blank"
				rel="noopener"
				class="local-entry-link"
			>
				{proposal.entryName}
			</a>
		</p>
	{/if}

	<p class="raw-text">
		{@html formattedComment}
	</p>

	<p>
		<span style="color: var(--color-{status.color})" title="Status">
			<status.icon size={20} strokeWidth={2.5} />
			{status.name}
		</span>

		<span class="origin" title="Ursprung">
			<origin.icon size={20} strokeWidth={2.5} />
			{#if proposal.origin === EDataOrigin.Member}
				{username}
			{:else}
				{origin.name}
			{/if}
		</span>
	</p>
</article>

<style lang="scss">
	@use "../../../scss/shadows" as *;

	article {
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-radius: 4px;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px 4px 0 0;
		padding: 7px 12px;

		header {
			display: flex;
			gap: 0.2rem;

			a {
				color: inherit;
				text-decoration: none;
				display: flex;
				align-items: center;

				&:hover {
					text-decoration: underline;
				}
			}

			span.short-id {
				color: var(--color-edge-dimmed);
				font-weight: 600;
			}

			h3 {
				margin: 0;
				display: flex;
				align-items: center;

				font-size: 1rem;
			}
		}

		p {
			margin: 0;
			display: flex;
			align-items: center;
			gap: 0.85rem;

			&.raw-text {
				display: block;
				margin-bottom: 5px;

				:global(br) {
					display: block;
					margin-top: 0.25rem;
				}
			}

			&.link {
				display: flex;
				gap: 5px;
				margin-bottom: 5px;

				a {
					color: inherit;
					font-weight: 500;
				}
			}

			span {
				display: inline-flex;
				align-items: center;
				gap: 0.2rem;
				font-weight: 500;
			}

			span.origin {
				opacity: 0.65;
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
