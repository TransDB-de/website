import { browser } from "$app/environment";
import { popupError } from "$components/popup.svelte";
import { env } from "$env/dynamic/public";
import type CapInstance from "@cap.js/widget";
import { t } from "./localization.svelte";

let capInstance: CapInstance | null = null;

async function getCapInstance() {
	if (!capInstance) {
		const { default: Cap } = await import("@cap.js/widget");
		capInstance = new Cap({
			apiEndpoint: `${env.PUBLIC_CAP_INSTANCE_URL}/${env.PUBLIC_CAP_SITE_KEY}`
		});
	}
	return capInstance;
}

async function solve(): Promise<string | null> {
	const cap = await getCapInstance();
	const { success, token } = await cap.solve();
	if (!success) {
		popupError(t("errors.captchaFailed"));
		return null;
	}
	return token;
}

let pending!: Promise<string | null>;

export function solveFresh(): Promise<string | null> {
	return solve();
}

export function preSolve(): void {
	pending = pending.then(() => solve());
}

export function getToken(): Promise<string | null> {
	return pending;
}

if (browser) {
	window.CAP_CUSTOM_WASM_URL = new URL(
		"/assets/cap_wasm_bg.wasm",
		env.PUBLIC_CAP_INSTANCE_URL
	).href;
	pending = solve();
}
