import { readable, writable } from "svelte/store";
import type { CMSUser } from "$models/user.model";
import axios from "axios";
import { browser } from "$app/environment";

let defaultUserData = browser ? JSON.parse(localStorage.getItem("userdata")) : null;
let defaultToken = browser ? localStorage.getItem("token") : null;

export let userdata = writable<CMSUser>(defaultUserData);
export let token = writable<string>(defaultToken);

if (browser) {
	userdata.subscribe((user) => {
		if (user) {
			localStorage.setItem("userdata", JSON.stringify(user));
		} else {
			localStorage.removeItem("userdata");
		}
	});

	token.subscribe((token) => {
		if (token) {
			localStorage.setItem("token", token);
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		} else {
			localStorage.removeItem("token");
		}
	});
}

export let currentLocation = writable<string>("");

/**
 * Media query driven value for mobile screen-width breakpoint
 */
export const isMobile = readable<boolean>(true, (set) => {
	// only run in browser
	if (browser) {
		// register event listener
		let mediaQuery = window.matchMedia("(max-width: 720px)");

		const isMobileEventListener = function (e: MediaQueryListEvent) {
			set(e.matches);
		};

		mediaQuery.addEventListener("change", isMobileEventListener);

		// set inital value
		set(mediaQuery.matches);

		// store clean-up function
		return () => {
			mediaQuery.removeEventListener("change", isMobileEventListener);
		};
	} else {
		// when executed on server do nothing, and return empty clean-ip function
		return () => {};
	}
});
