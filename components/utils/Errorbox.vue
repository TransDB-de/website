<template>
	<span class="errorbox" :class="invalid ? 'invalid' : ''">
		<span v-if="invalid" class="error">{{errorMSG}}</span>
		<slot />
	</span>
</template>

<script>
export default {
	name: "Errorbox",
	props: [
		"invalid",
		"errorMSG"
	]
}
</script>

<style>
span.invalid .checkbox-container:last-child {
	margin-bottom: 0;
}
</style>

<style scoped>

span {
	position: relative;
}

span.invalid {
	content: "";
	border-radius: 4px;
	border: 2px solid var(--color-error);
	padding: 6px 4px;
	margin-bottom: 20px;
}

span .error {
	position: absolute;
	color: var(--color-error);
	font-size: 12px;
	top: -14px;
	left: 0;
}

</style>
