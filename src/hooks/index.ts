import type { GetSession, Handle } from "@sveltejs/kit"
import jwt from "jsonwebtoken"

const secret = process.env["CSRF_TOKEN_SECRET"] as string ?? "";
const secretExpires = process.env["CSRF_TOKEN_EXPIRES_IN"] as string ?? "";

const prod = process.env["NODE_ENV"] === "production";
const cspConnectSrc = prod ? `connect-src 'self' ${process.env["AXIOS_BASE_URL"]} ${process.env["ACKEE_SERVER"]}` : "";

const config = {
	ackee_server: process.env["ACKEE_SERVER"],
	ackee_domainId: process.env["ACKEE_DOMAIN_ID"],
	ackee_eventId_distanceSearchCoordinates: process.env["ACKEE_EVENT_ID_DISTANCE_SEARCH_COORDINATES"],
	ackee_eventId_distanceSearchText: process.env["ACKEE_EVENT_ID_DISTANCE_SEARCH_TEXT"],
	ackee_eventId_newEntry: process.env["ACKEE_EVENT_ID_NEW_ENTRY"],
	ackee_eventId_social: process.env["ACKEE_EVENT_ID_SOCIAL"],
	ackee_ignoreLocalhost: process.env["ACKEE_IGNORE_LOCALHOST"] ? (process.env["ACKEE_IGNORE_LOCALHOST"] === "true") : true,
	ackee_detailed: process.env["ACKEE_DETAILED"] ? (process.env["ACKEE_DETAILED"] === "true") : false,
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
	
	return {
		csrfToken: csrfToken,
		...config
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	
	// add connect-src to csp header
	response.headers.append("Content-Security-Policy", cspConnectSrc);
	
	return response;
}
