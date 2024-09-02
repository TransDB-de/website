import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents({
		name: "SubmittedContent",
		path: "submitted"
	});

	return props;
}
