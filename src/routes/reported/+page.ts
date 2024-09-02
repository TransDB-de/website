import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents({
		name: "ReportedContent",
		path: "reported"
	});

	return props;
}
