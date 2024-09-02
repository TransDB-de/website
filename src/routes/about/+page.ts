import { loadContents } from "$lib/loadContents";

export async function load() {
	const props = await loadContents(
		{
			name: "DonationContent",
			path: "about/donation"
		},
		{
			name: "TechStackContent",
			path: "about/tech-stack"
		},
		{
			name: "NonCommercial",
			path: "about/non-commercial"
		},
		{
			name: "SocialMedia",
			path: "about/social-media"
		},
		{
			name: "MotivationContent",
			path: "about/motivation"
		},
		{
			name: "FlyerContent",
			path: "about/flyer"
		}
	);

	return props;
}
