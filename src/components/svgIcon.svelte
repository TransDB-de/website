<script lang="ts">
	export let name: string;
</script>

<svg {...$$props}>
	<use href={`${name}`} />
</svg>
