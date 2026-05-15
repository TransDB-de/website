import type { PageLoad } from "./$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async () => {
	return await loadContents({ name: "ReportNote", path: "report-note" });
};
