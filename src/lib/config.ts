/**
 * Env var wrapper.
 * Change these settings by setting the vars in the `.env` file.
 * You can also use a `.env.production` file to overwrite the defaults only for production environments.
 */
let config = {
	umami_src: "",
	umami_website_id: "",
	umami_event_social: "",
	umami_event_search_text: "",
	umami_event_search_coords: "",
	umami_event_new_entry: "",
	axios_baseURL: "http://localhost:1300",
	client_filterApplyTimeout: 0.6 * 1000,
	client_popupLinger: 4.0 * 1000,
	cms_url: ""
};

export default config;

export function populateConfig(session: object) {
	for (let [key, value] of Object.entries(session)) {
		
		if (key in config && value !== undefined) {
			config[key] = value;
		}
	}
}
