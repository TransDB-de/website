import type { GetSession } from "@sveltejs/kit"
import jwt from "jsonwebtoken"

export const getSession: GetSession = (request) => {	
	let csrfToken = jwt.sign({}, import.meta.env.CLIENT_CSRF_TOKEN_SECRET as string, { expiresIn: import.meta.env.CLIENT_CSRF_TOKEN_EXPIRES_IN as string });
	
	return {
		csrfToken: csrfToken
	}
}
