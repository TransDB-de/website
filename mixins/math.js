export default {
	methods: {
		clamp(number, min, max) {
			return Math.min(Math.max(number, min), max);
		}
	}
}
