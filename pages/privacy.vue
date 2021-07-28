<template>
	<div class="privacy">
		<nuxt-content :document="privacyPage"></nuxt-content>
		<nuxt-content :document="disclaimerPage"></nuxt-content>
		<nuxt-content :document="entryRemovalPolicyPage"></nuxt-content>
	</div>

</template>

<script>
export default {
	name: "privacy",
	head() {
		return {
			title: "Datenschutz",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Informationen zum Datenschutz. TransDB.de verwendet keine Tracking-Cookies und nutzt keine externen Skripte, welche Tracking-Cookies verwenden."
				}
			]
		}
	},
	async asyncData({ $content }) {
		const privacyPage = await $content("privacy").fetch();
		const disclaimerPage = await $content("disclaimer").fetch();
		const entryRemovalPolicyPage = await $content("entryRemovalPolicy").fetch();

		return { privacyPage, disclaimerPage, entryRemovalPolicyPage }
	}
}
</script>

<style>
.privacy > .nuxt-content {
	padding: 20px;
	max-width: 750px;
	position: initial;

	overflow-wrap: break-word;
}

.privacy p {
	line-height: 1.4em;
	padding: 0 1em;
}

.privacy h2, .privacy h3, .privacy h4 {
	margin-top: 2em;
}

@media only screen and (max-width: 420px) {
	.privacy > .nuxt-content {
		padding: 8px;
	}

	.privacy p {
		line-height: 1.4em;
		padding: 0 0.2em;
	}

	.privacy h1 {
		font-size: 1.8em;
	}
}
</style>