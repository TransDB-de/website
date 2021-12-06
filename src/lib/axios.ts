import config from "$lib/config"
import axios from "axios"

import { goto } from "$app/navigation"

axios.defaults.baseURL = config.axios.baseURL;

// Axios interceptor (middleware) to redirect unauthorized requests to login page
axios.interceptors.response.use((res) => res, (err) => {
	if (err.response.status === 401 && !window.location.pathname.includes("/login")) {
		goto("/login");	
	}
	
	return Promise.reject(err);
});