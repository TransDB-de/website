<template>

	<button :class="[color, light ? 'light' : '', center ? 'center' : '', icononly ? 'icon-only' : '', noshadow ? 'noshadow' : '']" @click="click">
		<slot v-if="!loading" />
		<Loader v-else :dark="light" />
	</button>
	
</template>

<script>
import Loader from "@/components/utils/Loader";

export default {
	name: "Button",
	components: {Loader},
	props: {
		light: Boolean,
		center: Boolean,
		color: String,
		loading: Boolean,
		icononly: Boolean,
		noshadow: Boolean,
	},
	methods: {
		
		click: function () {
			this.$emit("click");
		}
		
	}
}
</script>

<style scoped>

button {
	border: 0;
	color: white;
	background-color: var(--color-dark);
	cursor: pointer;
	font-size: 16px;
	display: flex;
	align-items: center;
	font-weight: 600;
	padding: 8px 16px;
	border-radius: 4px;
	outline: 0;
	transition: 0.12s ease background-color;
	font-family: 'Poppins', sans-serif;
}

button:not(.noshadow) {
	box-shadow: 0px 0px 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
}

button:not(.light) {
	height: 40px;
}

button:hover, button:focus {
	background-color: var(--color-dark-accent);
}

button:hover:not(.noshadow), button:focus:not(.noshadow) {
	box-shadow: 0px 0px 4px var(--color-box-shadow-strong), 0px 0px 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
}

button:active {
	background-color: var(--color-dark-active);
}

.red {
	background-color: var(--color-red);
}

.red:hover, .red:focus {
	background-color: var(--color-red-accent);
}

.red:active {
	background-color: var(--color-red-active);
}

.feather {
	stroke-width: 3;
	margin-right: 5px;
	width: 18px;
	height: 18px;
}

.icon-only {
	padding: 8px;
}

.icon-only .feather {
	margin: 0;

	min-width: 18px;
	min-height: 18px;
}

.light {
	background-color: var(--color-light);
	box-shadow: none;
	color: #334450;
	padding: 5px 10px;
}

.light:hover, .light:focus {
	background-color: var(--color-light-accent);
}

.light:active {
	background-color: var(--color-light-active);
}

.center {
	justify-content: center;
	align-items: center;
}

@media only screen and (max-width: 720px) {
	
	.light .feather {
		margin: 0;
	}
	
}
</style>