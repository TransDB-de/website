import type { PageLoad } from "./$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async ({ parent }) => {
	const { preferredLang } = await parent();
	return await loadContents(preferredLang, { name: "DatabaseHelp", path: "database-help" });
};
