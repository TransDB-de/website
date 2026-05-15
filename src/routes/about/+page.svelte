<script lang="ts">
	import type { PageData } from "./$types";
	import MemberCardCollection from "$components/memberCardCollection.svelte";
	import OpenCollectiveButton from "$components/openCollectiveButton.svelte";
	import TechStack from "$components/techStack.svelte";
	import { Download } from "@lucide/svelte";
	import externalLinks from "$content/external-links.json";
	import { t } from "$lib/localization";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>{t("about.title")}</title>
	<meta name="description" content={t("about.meta.description")} />
</svelte:head>

<div class="section">
	<h2>{t("about.team")}</h2>
	<div class="inner"><MemberCardCollection /></div>
</div>

<div class="section">
	<h2>{t("about.donation")}</h2>
	<div class="inner">
		<props.data.DonationContent />
		<OpenCollectiveButton href={externalLinks.donation} />
	</div>
</div>

<div class="section">
	<h2>{t("about.motivation")}</h2>
	<div class="inner"><props.data.MotivationContent /></div>
</div>

<div class="section">
	<h2>{t("about.socialMedia")}</h2>
	<div class="inner"><props.data.SocialMedia /></div>
</div>

<div class="section">
	<h2>{t("about.nonProfit")}</h2>
	<div class="inner"><props.data.NonCommercial /></div>
</div>

<div class="section">
	<h2>{t("about.techStack")}</h2>
	<div class="inner">
		<props.data.TechStackContent />
		<TechStack />
	</div>
</div>

<div class="section">
	<h2>{t("about.flyer")}</h2>
	<div class="inner">
		<div class="flyer-preview">
			<img src="/img/transdb_flyer_preview_front.png" alt={t("altTexts.flyerFront")} />
			<img src="/img/transdb_flyer_preview_back.png" alt={t("altTexts.flyerBack")} />
		</div>
		<a
			class="light"
			href="/files/transdb_flyer_a6.pdf"
			download
			title={t("mouseOverTexts.flyerA6")}
		>
			<Download />
			{t("about.downloadFlyer")}
		</a>
		<a
			class="light"
			href="/files/transdb_flyer_print.pdf"
			download
			title={t("mouseOverTexts.flyerPrint")}
		>
			<Download />
			{t("about.downloadFlyerProfessional")}
		</a>
	</div>
</div>

<style lang="scss">
	@use "../../scss/lengths" as *;
	@use "../../scss/shadows" as *;
	@use "../../scss/button" as *;

	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 65px 12px;
		width: 100%;

		:global(p) {
			line-height: 1.4em;
			font-size: 1.1em;
			text-align: left;
			font-weight: 500;
			margin: 0 0 1.3em 0;
			&:last-child {
				margin-bottom: 0;
			}
		}

		:global(h2) {
			text-align: center;
			font-size: 1.8em;
			margin: 0 0 0.6em 0;
		}

		&:nth-child(2n) {
			background-color: var(--color-background-bright);
		}

		.inner {
			width: 100%;
			max-width: 1100px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.flyer-preview {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 18px;
				max-width: 100%;
				margin-bottom: 18px;

				img {
					display: block;
					max-height: 400px;
					max-width: 100%;
					border-radius: 4px;
					box-shadow: $surface-shadow-small;
				}
			}

			:global(p) {
				text-align: center;
			}

			:global(a:not([class])) {
				color: var(--color-edge-highlight);
				text-decoration: none;
				border-bottom: 2px solid var(--color-edge-highlight);
			}

			a[download] {
				@include button;
				margin-bottom: 10px;
				text-decoration: none;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
