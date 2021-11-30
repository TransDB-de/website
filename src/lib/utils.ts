import type { APIValidationError, ValidationErrorMap } from "$models/error";
import { errorMappings } from "./errorMappings";

/**
 * Exectues a callback on a key event, if the key matches
 * @param key key to match
 * @param callback function to call
 * @returns key event handler
 */
export function isKey(key: string, callback: Function) {
	return (e: KeyboardEvent) => {
		if (e.code === key) callback();
	}
}

/**
 * Async wrapper for geolocation.getCurrentPosition
 * @param options 
 * @returns 
 */
export async function getGeoLocation(options?: PositionOptions): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

/**
 * Parse input validation errors from the api
 * @param errors Validation errors returned from the api
 */
export function parseValidationErrors(errors: APIValidationError[]): ValidationErrorMap {
	let err: ValidationErrorMap = {};
	
	for (let error of errors) {
		let key: string;
		let value: string;
		
		if (error.constraints) {
			[key, value] =  Object.entries(error.constraints)[0];
		} else if (error.children.length > 0) {
			let childErrors: ValidationErrorMap = parseValidationErrors(error.children);
			for (let ce in childErrors) {
				//TODO: Finish recursive call
			}
		}
		
		if (key in errorMappings) {
			err[error.property] = errorMappings[key];
		}
	}
	
	return err;
}