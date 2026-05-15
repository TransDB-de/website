import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		preferredLang: locals.preferredLang,
		apiToken: locals.apiToken
	};
};
