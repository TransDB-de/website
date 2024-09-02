import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents(
		{
			name: "Section1",
			path: "index/section-1"
		},
		{
			name: "Section2",
			path: "index/section-2"
		},
		{
			name: "Section3",
			path: "index/section-3"
		}
	);

	return props;
}
