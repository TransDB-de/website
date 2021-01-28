<template>
	<div class="menu-icon">
		<div class="line" :class="expand ? 'open': ''"/>
	</div>	
</template>

<script>
export default {
	name: "MenuIcon",
	props: {
		expand: Boolean
	}
}
</script>

<style scoped>
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
	background-color: white;
	width: 100%;
	height: 4px;
	transition: background-color 0.4s;
	border-radius: 2px;
}

.line:before,
.line:after {
	position: absolute;
	left: 0;
	width: 100%;
	height: 4px;
	background-color: white;
	content: "";
	transition: transform 0.4s;
	border-radius: 2px;
}

.line:before {
	top: 4px;
}

.line:after{
	bottom: 4px;
}

.open {
	background-color: transparent;
}

.open:before {
	transform: translateY(12px) rotate(45deg);
}

.open:after {
	transform: translateY(-12px) rotate(-45deg);
}

</style>