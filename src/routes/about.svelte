<script lang="ts">
	import MemberCardCollection from "$components/memberCardCollection.svelte"
</script>

<template lang="pug">
	div.section
		h2 Das Trans*DB Team
		div.inner
			MemberCardCollection
		
	div.section
		h2 Social Media
		div.inner
		
	div.section
		h2 Nicht-Kommerziell und Open Source
		p.inner
		
	div.section
		h2 Unterstütze uns mit einer Spende
		div.inner

</template>

<style lang="scss">
	@import "../scss/lengths";
	
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 45px 12px;
		width: 100%;
		//pointer-events: none;
		
		:global(p) {
			line-height: 1.4em;
			font-size: 1.17em;
			text-align: left;
			font-weight: 500;
			
			margin-top: 0;
		}
		
		:global(h2) {
			text-align: center;
			font-size: 1.8em;
			margin: 1.2em 0;
		}
		
		&:nth-child(2n) {
			background-color: var(--color-background-bright);
		}
		
		.inner {
			width: 100%;
			max-width: 1100px;
		}
	}
	
	:global(#kofiframe) {
		border:none;
		height: 560px;
		width:100%;
		background: white;
	}
</style>
