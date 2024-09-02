import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents({
		name: "ReportNote",
		path: "report-note"
	});

	return props;
}
