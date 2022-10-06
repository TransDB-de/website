import { derived, writable, get } from "svelte/store"
import { getValueByPath } from "./utils"

export const localeMappings = {
	de: "Deutsch",
	en: "English"
}

export const currentLocale = writable<string>("de");
export const locales: string[] = Object.keys(localeMappings);

let translation: any = null;

/**
 * Init localization with preferred language and dynamically import locale file
 * @param session sveltekit session
 */
export async function initLocalization(session: any) {
	const preferredLang = session.preferredLang;

	if (locales.includes(preferredLang)) {
		currentLocale.set(preferredLang)
	}

	translation = await import(`../locales/${get(currentLocale)}.json`);
}

function translate(locale: string, key: string) {
	if (!key) throw new Error("no key provided");
	if (!locale) throw new Error(`no translation for key "${key}"`);

	let text = getValueByPath(translation, key);

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	return text;
}

export const t = derived(currentLocale, ($locale) => (key: string) => translate($locale, key));