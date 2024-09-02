
import type { LayoutLoad } from "@sveltejs/kit"

import { get } from "svelte/store"
import { browser } from "$app/env";

import { injectSession } from "$lib/axios"
import config, { populateConfig } from "$lib/config"
import { initLocalization } from "$lib/localization"
import { token } from "$lib/store"

let configLoaded = false;

// runs every time "page" changes
export const load: LayoutLoad = async ({ url, session }) => {
	if (!configLoaded) {
		populateConfig(session);
		configLoaded = true;
	}
	
	injectSession(session);
	await initLocalization(session);
	
	let path = url.pathname.startsWith("/manage") ? "/manage" : url.pathname;
	
	// do not track some paths
	// also don't track team members
	let noTrack = ["/manage", "/login"].includes(path) || Boolean(get(token));
	
	if (!noTrack && browser && config.umami_src) {
		// use custom url beacuse we only want path name without query params
		await umami.track((props) => ({...props, url: path}));
	}
	
	return { path };
}
