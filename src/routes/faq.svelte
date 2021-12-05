<script lang="ts">
	import FAQContent from "$content/faq.md";
</script>

<template lang="pug">
	div.content
		FAQContent
</template>

<style lang="scss">
	@import "../scss/content";
	
	.content {
		:global(h2) {
			font-size: 1.2em;
			margin-top: 0;
			border-bottom: none;
		}
	}
</style>
