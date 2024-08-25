import type { GetSession, Handle } from "@sveltejs/kit"
import jwt from "jsonwebtoken"
import langHeaderParser from "accept-language-parser"
import { parse as parseCookies } from "cookie"

const secret = process.env["CSRF_TOKEN_SECRET"] as string ?? "";
const secretExpires = process.env["CSRF_TOKEN_EXPIRES_IN"] as string ?? "";

const prod = process.env["NODE_ENV"] === "production";
const umamiURL = process.env["UMAMI_SRC"] ? new URL(process.env["UMAMI_SRC"]).origin : "";
const cspConnectSrc = `connect-src 'self' ${process.env["AXIOS_BASE_URL"]} ${umamiURL}`;

const config = {
	umami_src: process.env["UMAMI_SRC"],
	umami_website_id: process.env["UMAMI_WEBSITE_ID"],
	umami_event_social: process.env["UMAMI_EVENT_SOCIAL"],
	umami_event_search_text: process.env["UMAMI_EVENT_SEARCH_TEXT"],
	umami_event_search_coords: process.env["UMAMI_EVENT_SEARCH_COORDS"],
	umami_event_new_entry: process.env["UMAMI_EVENT_NEW_ENTRY"],
	axios_baseURL: process.env["AXIOS_BASE_URL"],
	client_filterApplyTimeout: process.env["FILTER_APPLY_TIMEOUT"] ? parseFloat(process.env["FILTER_APPLY_TIMEOUT"]) * 1000: undefined,
	client_popupLinger: process.env["POPUP_LINGER"] ? parseFloat(process.env["POPUP_LINGER"]) * 1000 : undefined
}

export const getSession: GetSession = (request) => {
	let csrfToken = "";
	
	if (secret !== "") {
		csrfToken = jwt.sign(
			{},
			secret,
			{ expiresIn: secretExpires }
		);
	}
	
	const langs = langHeaderParser.parse(request.request.headers.get("Accept-Language"));
	let preferredLang = langs[0] ? langs[0].code : null;

	if (request.request.headers.has("Cookie")) {
		const cookies = parseCookies(request.request.headers.get("Cookie"))
	
		if ("preffered-lang" in cookies) {
			preferredLang = cookies["preffered-lang"];
		}
	}

	return {
		csrfToken: csrfToken,
		preferredLang,
		...config,
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	
	if (prod) {
		let csp = response.headers.get("Content-Security-Policy");
		
		csp += "; " + cspConnectSrc;
		
		// add connect-src to csp header
		response.headers.set("Content-Security-Policy", csp);
	}
	
	return response;
}
