<script lang="ts">
	export let expand = false;
	
	let customClass = "";
	export { customClass as class };
</script>

<div class="menu-icon {customClass}">
	<div class="line" class:expand></div>
</div>

<style lang="scss">
	.menu-icon {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;
		filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.2));
	}
	
	.line {
		background-color: var(--color-edge-bright);
		width: 100%;
		height: 4px;
		transition: background-color 0.4s;
		border-radius: 2px;
		
		&:before {
			top: 4px;
		}
		
		&:after {
			bottom: 4px;
		}
		
		&:before,
		&:after {
			position: absolute;
			left: 0;
			width: 100%;
			height: 4px;
			background-color: var(--color-edge-bright);
			content: "";
			transition: transform 0.4s;
			border-radius: 2px;
		}
		
		&.expand {
			background-color: transparent;
			
			&:before {
				transform: translateY(12px) rotate(45deg);
			}
			
			&:after {
				transform: translateY(-12px) rotate(-45deg);
			}
		}
	}
</style>
