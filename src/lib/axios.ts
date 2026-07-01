import { env } from "$env/dynamic/public";
import axios from "axios";
import { goto } from "$app/navigation";
import { popupWarn } from "$components/popup.svelte";
import { t } from "./localization.svelte";
import { AuthFailedError } from "$models/error";
import { getToken, preSolve } from "./captcha";

axios.defaults.baseURL = env.PUBLIC_AXIOS_BASE_URL ?? "http://localhost:1300";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
	if (config.captcha) {
		config.headers["X-Cap-Token"] = await getToken();
	}
	return config;
});

axios.interceptors.response.use(
	(res) => {
		if (res.config.captcha) preSolve();
		return res;
	},
	(err) => {
		if (err.config?.captcha) preSolve();
		return Promise.reject(err);
	}
);

axios.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response?.status === 401 && !window.location.pathname.includes("/login")) {
			goto("/login");
			popupWarn(t("warns.reLogin"));
			return Promise.reject(new AuthFailedError());
		}

		return Promise.reject(err);
	}
);
