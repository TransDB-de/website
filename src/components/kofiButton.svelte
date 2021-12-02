<script lang="ts">
	export let href = "";
</script>

<a {href} target="_blank" rel="noopener">
	<img src="/img/ko-fi-logo.png" alt="ko-fi logo" /> Unterstütze uns auf Ko-fi
</a>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		border-radius: 6px;
		background-color: #29ABE0;
		font-weight: 500;
		color: white;
		text-decoration: none;
		gap: 10px;
		padding: 0 15px 0 5px;
		font-family: "Poppins", sans-serif;
		
		transition: 0.2s background-color;
		
		img {
			height: 50px;
		}
		
		&:hover {
			background-color: darken(#29ABE0, 5%);
		}
	}
</style>