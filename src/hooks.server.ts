import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import jwt from "jsonwebtoken";
import langHeaderParser from "accept-language-parser";

export const handle: Handle = async ({ event, resolve }) => {
	const acceptLang = event.request.headers.get("Accept-Language");
	const langs = acceptLang ? langHeaderParser.parse(acceptLang) : [];
	let preferredLang = langs[0]?.code ?? "de";

	const cookieLang = event.cookies.get("preferred-lang");
	if (cookieLang) {
		preferredLang = cookieLang;
	}

	event.locals.preferredLang = preferredLang;

	event.locals.apiToken = env.CSRF_TOKEN_SECRET
		? jwt.sign({}, env.CSRF_TOKEN_SECRET, {
				expiresIn: (env.CSRF_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ?? "1h"
			})
		: "";

	return resolve(event);
};
