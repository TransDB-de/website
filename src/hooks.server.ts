import type { Handle } from "@sveltejs/kit";
import langHeaderParser from "accept-language-parser";
import { locales } from "$lib/localization.svelte";

export const handle: Handle = async ({ event, resolve }) => {
	const acceptLang = event.request.headers.get("Accept-Language");
	const langs = acceptLang ? langHeaderParser.parse(acceptLang) : [];
	let preferredLang = langs[0]?.code ?? "de";

	if (!locales.includes(preferredLang)) {
		preferredLang = locales[1];
	}

	const cookieLang = event.cookies.get("preferred-lang");
	if (cookieLang) {
		preferredLang = cookieLang;
	}

	event.locals.preferredLang = preferredLang;

	return resolve(event);
};
