/** Error object returned by the Api */
export interface ApiValidationProblem {
	property: string;
	code: string;
}

export class AuthFailedError extends Error {}
