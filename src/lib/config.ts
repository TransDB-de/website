/**
 * Env var wrapper.
 * Change these settings by setting the vars in the `.env` file.
 * You can also use a `.env.production` file to overwrite the defaults only for production environments.
 */
let config = {
	ackee_server: "",
	ackee_domainId: "",
	ackee_ignoreLocalhost: true,
	ackee_detailed: true,
	axios_baseURL: "http://localhost:1300",
	client_filterApplyTimeout: 0.6 * 1000,
	client_popupLinger: 4.0 * 1000
};

export default config;

export function populateConfig(session: object) {
	for (let [key, value] of Object.entries(session)) {
		
		if (key in config && value !== undefined) {
			config[key] = value;
		}
	}
}
