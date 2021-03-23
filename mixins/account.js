export default {
	methods: {
		logout: function () {
            
			this.$store.commit("SET_LOGIN_TOKEN", null);
			this.$store.commit("SET_USER_DATA", null);
			this.$axios.setToken(false);
			
			window.location.href = '/';
			
		}
	},
	computed: {
        isAdmin: function() {
            return this.$store.state.user && this.$store.state.user.admin;
        }
    }
}
