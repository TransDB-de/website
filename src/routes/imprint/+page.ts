import type { PageLoad } from "./$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async () => {
	return await loadContents(
		{ name: "ImprintContent", path: "imprint" },
		{ name: "DisclaimerContent", path: "disclaimer" },
		{ name: "EntryRemovalContent", path: "entry-removal-policy" }
	);
};
