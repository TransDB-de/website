import { readable, writable } from "svelte/store"
import { browser } from '$app/env'
import type { User } from "$models/user.model"


export const userdata = writable<User>(null);


/**
 * Media query driven value for mobile screen-width breakpoint
 */
export const isMobile = readable<boolean>(true, (set) => {
	// only run in browser
	if (browser) {
		let mediaQuery = window.matchMedia('(max-width: 720px)');
		
		const isMobileEventListener = function(e: MediaQueryListEvent) {
			set(e.matches);
		}
		
		mediaQuery.addEventListener("change", isMobileEventListener);
		
		// store clean-up function
		return () => {
			mediaQuery.removeEventListener("change", isMobileEventListener);
		};
	} else {
		// when executed on server do nothing, and return empty clean-ip function
		return () => {};
	}
});
