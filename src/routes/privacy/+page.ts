import type { PageLoad } from "./$types";
import { loadContents } from "$lib/loadContents";

export const load: PageLoad = async ({ parent }) => {
	const { preferredLang } = await parent();
	return await loadContents(
		preferredLang,
		{ name: "PrivacyContent", path: "privacy" },
		{ name: "DisclaimerContent", path: "disclaimer" },
		{ name: "EntryRemovalContent", path: "entry-removal-policy" }
	);
};
