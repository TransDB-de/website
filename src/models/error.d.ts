/** Error object returned by the Api */
export interface ApiValidationError {
	constraints?: { [key: string]: string };
	property: string;
	children?: ApiValidationError[];
}

/** Transformed flat error map containing Api Valiadtion Errors as plaintext messages */
export interface ValidationErrorMap {
	[key: string]: string;
}
