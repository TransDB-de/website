import { readable, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { CMSUser } from "$models/user.model";

const storedUserData = browser ? localStorage.getItem("userdata") : null;
let defaultUserData = storedUserData ? JSON.parse(storedUserData) : null;

export const userdata = writable<CMSUser | null>(defaultUserData);

if (browser) {
	userdata.subscribe((user) => {
		if (user) {
			localStorage.setItem("userdata", JSON.stringify(user));
		} else {
			localStorage.removeItem("userdata");
		}
	});
}

export const currentLocation = writable<string>("");

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
		// when executed on server do nothing, and return empty clean-up function
		return () => {};
	}
});
