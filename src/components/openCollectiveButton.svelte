<script lang="ts">
	import { t } from "$lib/localization"

	export let href = "";
</script>

<a {href} target="_blank" rel="noopener">
	<img src="/img/open-collective.svg" alt={ $t("openCollectiveButton.alt") } /> { $t("openCollectiveButton.text") }
</a>

<style lang="scss">
	@import "../scss/shadows";
	
	a {
		display: flex;
		align-items: center;
		border-radius: 6px;
		background: var(--donate-button-gradient);
		font-weight: 500;
		color: white;
		text-decoration: none;
		gap: 10px;
		padding: 6px 8px;
		font-family: "Poppins", sans-serif;
		box-shadow: $surface-shadow-soft;
		
		transition: 0.2s background-color;
		
		img {
			height: 44px;
		}
		
		&:hover, &:focus {
			box-shadow: $surface-shadow-strong;
		}
	}
</style>
