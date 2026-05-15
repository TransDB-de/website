<script lang="ts">
	interface Props {
		dark?: boolean;
		big?: boolean;
		class?: string;
	}

	const props: Props = $props();
</script>

<span class="loader {props.class ?? ''}" class:dark={props.dark} class:big={props.big}></span>

<style lang="scss">
	.loader {
		display: inline;
		height: 23px;
		width: 23px;
		border-radius: 50%;
		border: 2px solid transparent;
		border-top: 2px solid var(--color-edge-light);
		border-right: 2px solid var(--color-edge-light);
		animation: spin 0.4s linear infinite;

		&.dark {
			border-top: 2px solid var(--color-edge);
			border-right: 2px solid var(--color-edge);
		}

		&.big {
			height: 32px;
			width: 32px;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
