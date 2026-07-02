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
	import { usercache } from "$lib/store";
	import Button from "$components/elements/button.svelte";

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

	let username = $derived(
		activity.userId && $usercache ? $usercache.find((u) => u.id === activity.userId)?.name : null
	);

	let cmsUrl = $derived(
		activity.attachments?.CmsTicketId
			? `${env.PUBLIC_CMS_URL}/admin/content/${env.PUBLIC_CMS_TICKET_COLLECTION}/${activity.attachments.CmsTicketId}`
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
		<div>
			<h3 style="color: {color}">
				<Icon size={22} />
				{label}
			</h3>

			{#if username}
				<span class="user">von <b>{username}</b></span>
			{/if}

			{#if activity.attachments?.ReportType}
				<span class="report-type">
					({reportTypeLabels[activity.attachments.ReportType]})
				</span>
			{/if}
		</div>

		{#if timestamp}
			<span class="timestamp">{timestamp}</span>
		{/if}
	</header>

	{#if showEntry}
		<p title="Der Eintrag, zu dem diese Aktivität gehört">
			<FileText size={20} />

			<a
				href={`/manage/${activity.entryId}`}
				target="_blank"
				rel="noopener"
				class="local-entry-link"
			>
				{#if activity.entryName}
					{activity.entryName}
				{:else}
					Eintrag öffnen
				{/if}
			</a>
		</p>
	{/if}

	{#if activity.attachments?.CmsTicketId}
		<p title="Link zum CMS Ticket">
			<Tags size={20} />
			<a href={cmsUrl} target="_blank" rel="noopener">
				CMS-Ticket #{activity.attachments.CmsTicketId}
			</a>
		</p>
	{/if}

	{#if activity.comment}
		<p title="Kommentar/Grund">
			<MessageSquareQuote size={20} />
			<span>
				{activity.comment}
			</span>
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

		<p title="Dieser Eintrag ist ein Duplikat von der Duplikats-Grundlage">
			<Link2 size={20} />
			<a href={duplicateLink} target="_blank" rel="noopener"> Duplikats-Grundlage </a>
		</p>
	{/if}

	{#if activity.type === "Deleted" && false}
		<p>
			<Button light>
				<Undo2 />
				Wiederherstellen
			</Button>
		</p>
	{/if}
</article>

<style lang="scss">
	@use "../../../scss/shadows" as *;

	article.activity-item {
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
