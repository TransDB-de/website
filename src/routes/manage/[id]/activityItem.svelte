<script lang="ts">
	import type { EntryActivity, EntryActivityType } from "$models/activity.model";
	import {
		Archive,
		BadgeCheck,
		Ban,
		ChartLine,
		Copy,
		FilePen,
		FilePlus2,
		FileText,
		Flag,
		Link2,
		LockOpen,
		MapPinOff,
		MessageSquare,
		MessageSquareQuote,
		MessageSquareText,
		Tags,
		Trash2,
		Undo2
	} from "@lucide/svelte";
	import { env } from "$env/dynamic/public";
	import { t } from "$lib/localization.svelte";

	interface Props {
		activity: EntryActivity;
		showEntry?: boolean;
	}

	let { activity, showEntry }: Props = $props();

	type Config = { label: string; color: string; icon: typeof FilePen };

	const typeConfig: Record<EntryActivityType, Config> = {
		Submitted: { label: "Eingereicht", color: "var(--color-edge-success)", icon: FilePlus2 },
		DuplicateDetected: { label: "Duplikat erkannt", color: "var(--color-edge-warn)", icon: Copy },
		Approved: { label: "Freigeschaltet", color: "var(--color-edge-highlight)", icon: BadgeCheck },
		Archived: { label: "Archiviert", color: "var(--color-edge-error)", icon: Archive },
		Edited: { label: "Bearbeitet", color: "var(--color-edge-highlight)", icon: FilePen },
		Blocked: { label: "Gesperrt", color: "var(--color-edge)", icon: Ban },
		Unblocked: { label: "Entsperrt", color: "var(--color-edge-highlight)", icon: LockOpen },
		Reported: { label: "Gemeldet", color: "var(--color-edge-warn)", icon: Flag },
		Deleted: { label: "Gelöscht", color: "var(--color-edge-error)", icon: Trash2 },
		Restored: { label: "Wiederhergestellt", color: "var(--color-edge-success)", icon: Undo2 },
		GeoLocationFailed: {
			label: "Geocodierung fehlgeschlagen",
			color: "var(--color-edge-warn)",
			icon: MapPinOff
		}
	};

	const reportTypeLabels: Record<string, string> = {
		Edit: t("reportForm.categories")[1],
		Report: t("reportForm.categories")[2],
		Other: t("reportForm.categories")[3]
	};

	const { label, color, icon: Icon } = typeConfig[activity.type] ?? typeConfig.Edited;

	let timestamp = $derived(
		activity.timestamp
			? new Intl.DateTimeFormat("de-DE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				}).format(new Date(activity.timestamp))
			: null
	);

	let shortUserId = $derived(activity.userId ? activity.userId.slice(-8) : null);

	let cmsUrl = $derived(
		activity.attachments?.CmsTicketId
			? `${env.PUBLIC_CMS_URL}/admin/content/transdb_tickets/${activity.attachments.CmsTicketId}`
			: null
	);

	let duplicateLink = $derived(
		activity.attachments?.PossibleDuplicate
			? `/manage/${activity.attachments.PossibleDuplicate.entryId}`
			: null
	);
</script>

<article class="activity-item">
	<header>
		<h3 style="color: {color}">
			<Icon size={22} />
			{label}
		</h3>

		{#if activity.userId}
			<span class="user">von <b>{shortUserId}</b></span>
		{/if}

		{#if activity.attachments?.ReportType}
			<span class="report-type">
				({reportTypeLabels[activity.attachments.ReportType]})
			</span>
		{/if}

		{#if timestamp}
			<span class="timestamp">{timestamp}</span>
		{/if}
	</header>

	{#if showEntry}
		<p>
			<FileText size={20} />
			<a href={`/manage/${activity.entryId}`} target="_blank" rel="noopener"> Eintrag öffnen </a>
		</p>
	{/if}

	{#if activity.comment}
		<p>
			<MessageSquareQuote size={20} />
			<span>
				{activity.comment}
			</span>
		</p>
	{/if}

	{#if activity.attachments?.CmsTicketId}
		<p>
			<Tags size={20} />
			<a href={cmsUrl} target="_blank" rel="noopener">
				Ticket #{activity.attachments.CmsTicketId}
			</a>
		</p>
	{/if}

	{#if activity.attachments?.PossibleDuplicate}
		<p>
			<ChartLine size={20} />
			<span>
				Wahrscheinlichkeit: &nbsp;
				<b>{activity.attachments?.PossibleDuplicate.probability * 100}%</b>
			</span>
		</p>

		<p>
			<Link2 size={20} />
			<a href={duplicateLink} target="_blank" rel="noopener"> Duplikats-Kandidat </a>
		</p>
	{/if}
</article>

<style lang="scss">
	article.activity-item {
		display: flex;
		flex-direction: column;
		border-bottom: 2px dotted var(--color-edge-light);
		padding-bottom: 10px;
		gap: 0.4rem;

		header {
			display: flex;
			align-items: center;
			gap: 0.5rem;

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

		p {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 0.3rem;
			margin: 0;
			padding-left: 1.75rem;

			span {
				display: inline-flex;
			}

			:global(.lucide) {
				stroke-width: 2.5;
				height: 20px;
				width: 20px;
			}

			a {
				color: var(--color-edge-highlight);
				font-weight: 500;
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
		color: var(--color-edge);
		font-weight: 400;
		margin-left: auto;
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
