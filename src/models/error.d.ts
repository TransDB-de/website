export interface APIValidationError {
	constraints?: { [key: string]: string };
	property: string;
	children?: APIValidationError[];
}

export interface ValidationErrorMap {
	[key: string]: string;
}