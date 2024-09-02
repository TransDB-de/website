
import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents({
		name: "PrivacyContent",
		path: "privacy"
	}, {
		name: "DisclaimerContent",
		path: "disclaimer"
	}, {
		name: "EntryRemovalContent",
		path: "entry-removal-policy"
	});
	
	return props;
}
