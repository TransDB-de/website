import type { PageLoad } from "./$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async ({ parent }) => {
	const { preferredLang } = await parent();
	return await loadContents(
		preferredLang,
		{ name: "Section1", path: "index/section-1" },
		{ name: "Section2", path: "index/section-2" },
		{ name: "Section3", path: "index/section-3" }
	);
};
