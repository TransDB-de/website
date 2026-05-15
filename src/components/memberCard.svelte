<script lang="ts">
	import InstagramBrandIcon from "$brandIcons/instagramBrandIcon.svelte";
	import GitHubBrandIcon from "$brandIcons/gitHubBrandIcon.svelte";
	import DiscordBrandIcon from "$brandIcons/discordBrandIcon.svelte";
	import { Globe } from "@lucide/svelte";

	import type { Component } from "svelte";
	import { env } from "$env/dynamic/public";
	import { t } from "$lib/localization";

	import { tick } from "svelte";
	import { popupOk } from "$components/popup.svelte";

	interface Social {
		type: string;
		link?: string | null;
		text?: string;
	}

	interface Props {
		name?: string;
		title?: string;
		image?: string;
		socials: Social[];
	}

	const props: Props = $props();

	function getComponent(componentName: string): Component | undefined {
		switch (componentName) {
			case "instagram":
				return InstagramBrandIcon;
			case "github":
				return GitHubBrandIcon;
			case "discord":
				return DiscordBrandIcon;
			case "web":
				return Globe;
			default: {
				console.error(`Unkown Socials Type: ${componentName}`);
				return undefined;
			}
		}
	}

	function logSocials(event: MouseEvent) {
		let key = (event.currentTarget as HTMLLinkElement).href;

		if (key === "") {
			key = "Discord Tag";
		}

		console.dir(event.currentTarget);

		if (umami) umami.track(env.PUBLIC_UMAMI_EVENT_SOCIAL, { link: key });
	}

	async function copyToClipboard(e: MouseEvent, string?: string) {
		if (!string) return;

		e.preventDefault();

		navigator.clipboard.writeText(string);

		await tick();

		popupOk(t("infos.copiedToClipboard"));
	}
</script>

<div class="member-card">
	<img src={props.image} alt="team member" />
	<h3>{props.name}</h3>
	<h4>{props.title}</h4>

	<div class="socials">
		{#each props.socials as social}
			{@const SocialIcon = getComponent(social.type)}
			<a
				href={social.link ?? ""}
				target={social.link ? "_blank" : "_self"}
				onclick={(e) => {
					logSocials(e);
					copyToClipboard(e, social.text);
				}}
				rel="noopener"
			>
				{#if SocialIcon}
					<SocialIcon />
				{/if}
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "../scss/shadows" as *;

	.member-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 20px;
		width: 210px;

		img {
			height: 100px;
			width: 100px;
			border-radius: 4px;
			box-shadow: $surface-shadow-small;
			margin-bottom: 5px;
		}

		h3 {
			margin: 0;
		}

		h4 {
			margin: 0;
			color: var(--color-edge-dimmed);
			font-weight: 500;
			font-size: 0.8em;
		}

		.socials {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			margin-top: 5px;

			a {
				border: none !important;
				color: var(--color-edge) !important;
			}

			:global(svg) {
				width: 22px;
				height: 22px;
			}

			:global(svg:not(.lucide)) {
				fill: var(--color-edge) !important;
			}

			:global(.lucide) {
				stroke: var(--color-edge) !important;
			}
		}
	}
</style>
