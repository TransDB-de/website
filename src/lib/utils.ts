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
