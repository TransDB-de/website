import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
	return {
		preferredLang: locals.preferredLang,
		path: url.pathname
	};
};
