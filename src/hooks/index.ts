import type { GetSession } from "@sveltejs/kit"
import jwt from "jsonwebtoken"

const secret = process.env["CSRF_TOKEN_SECRET"] as string ?? "";
const secretExpires = process.env["CSRF_TOKEN_EXPIRES_IN"] as string ?? "";

const config = {
	ackee_server: process.env["ACKEE_SERVER"],
	ackee_domainId: process.env["ACKEE_DOMAIN_ID"],
	ackee_ignoreLocalhost: process.env["ACKEE_IGNORE_LOCALHOST"] ? (process.env["ACKEE_IGNORE_LOCALHOST"] === "true") : true,
	ackee_detailed: process.env["ACKEE_DETAILED"] ? (process.env["ACKEE_DETAILED"] === "true") : false,
	axios_baseURL: process.env["AXIOS_BASE_URL"],
	client_filterApplyTimeout: process.env["FILTER_APPLY_TIMEOUT"] ? parseFloat(process.env["FILTER_APPLY_TIMEOUT"]) : undefined,
	client_popupLinger: process.env["POPUP_LINGER"] ? parseFloat(process.env["POPUP_LINGER"]) : undefined
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
