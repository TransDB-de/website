import axios from "axios";

import { goto } from "$app/navigation";
// @ts-ignore no such export
import { popupWarn } from "$components/popup.svelte";
import { token } from "./store";
import { t } from "./localization";

axios.interceptors.response.use(
	(res) => res,
	(err) => {
		// Axios interceptor (middleware) to redirect unauthorized requests to login page
		if (err.response.status === 401 && !window.location.pathname.includes("/login")) {
			goto("/login");
			popupWarn(t("warns.reLogin"));
			token.set("");
			return;
		}

		if (err.response.status === 403 && err.response.data.error === "invalid_csrf_token") {
			window.location.reload();
			return;
		}

		return Promise.reject(err);
	}
);

export function injectSession(session) {
	axios.defaults.baseURL = config.axios_baseURL;
	axios.defaults.headers.common["x-csrf-token"] = session.csrfToken;
}
