import config from "$lib/config"
import axios from "axios"

import { goto } from "$app/navigation"

axios.defaults.baseURL = config.axios.baseURL;

axios.interceptors.response.use((res) => res, (err) => {
	// Axios interceptor (middleware) to redirect unauthorized requests to login page
	if (err.response.status === 401 && !window.location.pathname.includes("/login")) {
		goto("/login");	
	}
	
	if (err.response.status === 403 && err.response.data.error === "invalid_csrf_token") {
		window.location.reload();
		return;
	}
	
	return Promise.reject(err);
});

export function injectSession(session) {
	axios.defaults.headers.common["x-csrf-token"] = session.csrfToken;
}
