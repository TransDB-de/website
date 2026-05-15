import { env } from "$env/dynamic/public";
import axios from "axios";
import { goto } from "$app/navigation";
import { popupWarn } from "$components/popup.svelte";
import { token } from "./store";
import { t } from "./localization";

axios.defaults.baseURL = env.PUBLIC_AXIOS_BASE_URL ?? "http://localhost:1300";

axios.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response?.status === 401 && !window.location.pathname.includes("/login")) {
			goto("/login");
			popupWarn(t("warns.reLogin"));
			token.set("");
			return;
		}

		return Promise.reject(err);
	}
);
