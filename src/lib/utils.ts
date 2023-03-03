import type { ApiValidationError, ValidationErrorMap } from "$models/error"
import { errorMappings } from "./errorMappings"

/**
 * Exectues a callback on a key event, if the key identifier matches
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
 * @returns position object
 */
export async function getGeoLocation(options?: PositionOptions): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

/**
 * Parse input validation errors from the api, and transforms them into a flat map
 * @param errors Validation errors returned from the api
 */
export function parseValidationErrors(errors: ApiValidationError[]): ValidationErrorMap {
	let err: ValidationErrorMap = {};
	
	for (let error of errors) {
		let constraintName: string;
		
		if (error.constraints) {
			constraintName = Object.keys(error.constraints)[0];
		} else if (error.children.length > 0) {
			let childErrors: ValidationErrorMap = parseValidationErrors(error.children);
			for (let childConstraintName in childErrors) {
				err[error.property + "." + childConstraintName] = childErrors[childConstraintName];
			}
		}
		
		//TODO: in order to add multi-lang support, the final mapping has to be applied in-component
		if (constraintName in errorMappings) {
			err[error.property] = errorMappings[constraintName];
		}
	}
	
	return err;
}

/**
 * Wrapper for Object.entries, which can accept undefined objects
 * @param obj object to parse
 * @returns key, value pair array
 */
export function getEntries<T = any>(obj?: Object): [string, T][] {
	if (obj) {
		return Object.entries(obj);
	} else {
		return [];
	}
}

/**
 * Clamps a value to specified ran
 * @param val value to clamp
 * @param min lower clamp
 * @param max upper clamp
 * @returns clamped value
 */
export function clamp(val: number, min: number, max: number): number {
	return Math.min(Math.max(val, min), max);
}

/**
 * Async-Await variant of setTimeout
 * @param delay milliseconds to wait before resolving the promise
 * @returns promise that resolves after specified delay
 */
export async function timeout(delay: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

/**
 * Compare two objects and get the changes
 * @param original original unchanged object
 * @param changed modified object
 * @return object containing the changes
 */
export function getObjChanges(original: object, changed: object): object {
	let changes = {};
	
	for (const [key, val] of Object.entries(changed)) {
		if (key in original) {
			if (JSON.stringify(val) !== JSON.stringify(original[key])) {
				changes[key] = changed[key]
			}
		} else {
			changes[key] = changed[key]
		}
	}
	
	return changes;
}

/**
 * Recursilvy replaces all values of an object
 * @param object target object to replace values in
 * @param search value to match
 * @param replace replacement value
 * @returns modified object
 */
export function replaceFields<S, R>(object: object, search: S, replace: R): object {
	for (let key in object) {
		let val = object[key];
		
		if (val === search) {
			object[key] = replace;
		} else if (typeof val === "object" && !Array.isArray(val)) {
			object[key] = replaceFields(val, search, replace);
		}
	}
	
	return object;
}

/**
 * Removes an element from an array. Returns true if the element was removed
 * @param array array from which the element should be removed
 * @param element element to be removed
 * @returns modified array
 */
export function removeFromArray<T>(array: Array<T>, element: T): Array<T> {
	const index = array.indexOf(element);
	
	if (index > -1) {
		array.splice(index, 1);
	}
	
	return array;
}

/** Shuffles an array, and returns the shuffled version */
export function shuffleArray<T>(array: Array<T>): Array<T> {
	let j, x, i;
	let a = [...array];
	
	for (i = array.length - 1; i > 0; i--) {
		j = Math.floor(random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	
	return a;
}


let _s = Math.random() * 1000;
/**
 * Set seet for seedable random number generator
 * @param seed 
 */
export function seed(seed: number): void {
	_s = seed;
}

/**
 * Seedable random number generator
 * @see seed()
 */
export function random(): number {
	var x = Math.sin(_s++) * 10000;
	return x - Math.floor(x);
}

/**
 * Get a value from a nested object by path
 * @param object Source object
 * @param path Path to desired value
 * @returns selected value
 */
export function getValueByPath(object: any, path: string): any {
	return path.split(".").reduce((a, b) => a[b], object);
}

export type FlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends string
	? T[Key] extends Record<string, unknown>
		? `${Key}.${FlattenObjectKeys<T[Key]>}` : `${Key}`
	: never;
