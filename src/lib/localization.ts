import { derived, writable, get } from "svelte/store"
import { getValueByPath } from "./utils"
import type translationMapping from "../locales/de.json"
import type { FlattenObjectKeys, NestedDict } from "./utils"

export const localeMappings = {
	de: "Deutsch",
	en: "English"
}

export let currentLocale = "de";
export const locales: string[] = Object.keys(localeMappings);

let translation: any = null;

/**
 * Init localization with preferred language and dynamically import locale file
 * @param session sveltekit session
 */
export async function initLocalization(session: any) {
	const preferredLang = session.preferredLang;
	
	if (locales.includes(preferredLang)) {
		currentLocale = preferredLang;
	}
	
	translation = await import(`../locales/${preferredLang}.json`);
}

export function setLocale(newLocale: string) {
	document.cookie = `preffered-lang=${newLocale}; SameSite=Strict; Secure`;
	window.location.reload();
}

type TranslationMapping = typeof translationMapping;
type MappingKey = FlattenObjectKeys<TranslationMapping>;

/**
 * Translate a key to a given locale
 */
export function translate(locale: string, key: MappingKey | keyof TranslationMapping) {
	if (!key) throw new Error("no key provided");
	if (!locale) throw new Error(`no translation for key "${key}"`);
	
	let text = getValueByPath(translation, key);
	
	if (!text) throw new Error(`no translation found for ${locale}.${key}`);
	
	return text;
}

export function t(key: keyof TranslationMapping): NestedDict;
export function t(key: MappingKey): string;

/**
 * Translate a key to the current locale
 */
export function t(key: MappingKey | keyof TranslationMapping) { return translate(currentLocale, key) };
