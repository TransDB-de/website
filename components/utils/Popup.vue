<template>
	<div class="popup" @click="visible = false" :class="[popup.type, visible ? 'visible' : '']">
		<CheckCircleIcon v-if="popup.type === 'ok'" />
		<AlertCircleIcon v-if="popup.type === 'warn'" />
		<XCircleIcon v-if="popup.type === 'error'" />
		<span>{{ popup.text }}</span>
	</div>
</template>

<script>
import { AlertCircleIcon, CheckCircleIcon, XCircleIcon } from "vue-feather-icons";

export default {
	components: { AlertCircleIcon, CheckCircleIcon, XCircleIcon },
	data() {
		return {
			visible: false,
			id: 0
		}
	},
	computed: {
		popup() {
			if (this.$store.state.popup.text !== "") {
	this.showPopup();
			}

			return this.$store.state.popup;
		}
	},
	methods: {
		showPopup() {
			this.visible = true;

			this.id += 1;
			let id = this.id;

			setTimeout(() => {

	if (id === this.id) this.visible = false;

			}, 4000);
		}
	}
}
</script>

<style scoped>

.popup {
	position: fixed;
	margin-left: auto;
	margin-right: auto;
	left: 16px;
	right: 16px;
	bottom: 3em;

	max-width: 380px;
	width: fit-content;
	display: flex;
	flex-direction: row;
	align-items: center;

	background-color: var(--color-popup-default);

	padding: 10px 12px;
	border-radius: 4px;
	box-shadow: 0px 0px 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	color: white;

	visibility: hidden;
	opacity: 0%;
	transition: opacity 1.4s;
	transition: visibility 0s linear 1.4s, opacity 1.4s;

	font-family: 'Fira Sans', sans-serif;
	font-size: 18px;

	pointer-events: none;
}

.popup > span {
	margin-left: 8px;
}

.popup > .feather {
	min-width: 22px;
	min-height: 22px;
}

.popup.visible {
	cursor: pointer;
	pointer-events: unset;

	visibility: visible;
	opacity: 1;
	transition: visibility 0s linear 0s, opacity 300ms;
}

.popup.ok {
	background-color: var(--color-popup-ok);
}

.popup.warn {
	background-color: var(--color-popup-warn);
}

.popup.error {
	background-color: var(--color-popup-error);
}

</style>
