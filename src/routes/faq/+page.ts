
import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents({
		name: "FAQContent",
		path: "faq"
	});
	
	return props;
}
