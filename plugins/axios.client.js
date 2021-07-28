export default function ({ $axios, store, redirect }) {

	$axios.onError(async (error) => {

		if(error.response.status === 401 && !error.config.url.match("/login")) {

			await store.commit("SET_LOGIN_TOKEN", null);
			await store.commit("SET_USER_DATA", null);
			redirect("/login");

		} else {
			return Promise.reject(error);
		}

	});

}