import { env } from "$env/dynamic/public";
import axios from "axios";
import { goto, invalidateAll } from "$app/navigation";
import { get } from "svelte/store";
import { page } from "$app/stores";
import { popupWarn } from "$components/popup.svelte";
import { token } from "./store";
import { t } from "./localization.svelte";

axios.defaults.baseURL = env.PUBLIC_AXIOS_BASE_URL ?? "http://localhost:1300";

// Shared promise so parallel requests share a single token refresh instead of each triggering one
let csrfRefreshPromise: Promise<void> | null = null;

axios.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response?.status === 401 && !window.location.pathname.includes("/login")) {
			goto("/login");
			popupWarn(t("warns.reLogin"));
			token.set("");
			return Promise.reject(err);
		}

		if (err.response?.status === 403 && err.response?.data.error === "invalid_csrf_token") {
			if (err.config._csrfRetry) {
				// Already retried after a fresh token — propagate to avoid an infinite loop
				return Promise.reject(err);
			}

			// Re-run the layout server load to get a fresh JWT embedded in page data.
			// The layout's $effect will update axios.defaults.headers once invalidation completes.
			if (!csrfRefreshPromise) {
				csrfRefreshPromise = invalidateAll().finally(() => {
					csrfRefreshPromise = null;
				});
			}
			await csrfRefreshPromise;

			// $effect in the layout hasn't run yet at this point — read the new token
			// directly from the page store and apply it before retrying
			const newToken = get(page).data.apiToken;
			if (newToken) {
				axios.defaults.headers.common["X-CSRF-Token"] = newToken;
			}

			// err.config.headers has the old token baked in — override it explicitly
			return axios({
				...err.config,
				_csrfRetry: true,
				headers: { ...err.config.headers, "X-CSRF-Token": newToken }
			});
		}

		return Promise.reject(err);
	}
);
