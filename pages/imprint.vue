<template>
	<div class="imprint">
		<nuxt-content :document="imprintPage"></nuxt-content>
		<nuxt-content :document="disclaimerPage"></nuxt-content>
		<nuxt-content :document="entryRemovalPolicyPage"></nuxt-content>
	</div>

</template>

<script>
export default {
	name: "imprint",
	head() {
		return {
			title: "Impressum",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Kotaktmöglichkeiten zu unserem Team und Informationen dazu, wie man einen Eintrag löschen oder bearbeiten lassen kann."
				}
			]
		}
	},
	async asyncData({ $content }) {
		const imprintPage = await $content("imprint").fetch();
		const disclaimerPage = await $content("disclaimer").fetch();
		const entryRemovalPolicyPage = await $content("entryRemovalPolicy").fetch();

		return { imprintPage, disclaimerPage, entryRemovalPolicyPage }
	}
}
</script>

<style>
.imprint > .nuxt-content {
	padding: 20px;
	max-width: 750px;
	position: initial;

	overflow-wrap: break-word;
}

.imprint p {
	line-height: 1.4em;
	padding: 0 1em;
}

.imprint h2, .imprint h3, .imprint h4 {
	margin-top: 2em;
	margin-bottom: 0.8em;
}

@media only screen and (max-width: 420px) {
	.imprint > .nuxt-content {
		padding: 8px;
	}

	.imprint p {
		line-height: 1.4em;
		padding: 0 0.2em;
	}

	.imprint h1 {
		font-size: 1.8em;
	}
}
</style>