import type { PageLoad } from "../../../report/$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async ({ parent }) => {
	const { preferredLang } = await parent();
	return await loadContents(preferredLang, { name: "ReportNote", path: "report-note" });
};
