import config from "$lib/config"
import { browser } from "$app/env"
import * as ackeeTracker from "ackee-tracker"

let instance: ackeeTracker.AckeeInstance;

async function onNavigate(path: string) {
	if (browser) {
		if (!instance) {
			instance = ackeeTracker.create(
				config.ackee_server,
				{
					detailed: config.ackee_detailed,
					ignoreLocalhost: config.ackee_ignoreLocalhost
				}
			);
		}
		
		let attributes = ackeeTracker.attributes(config.ackee_detailed);
		attributes.siteLocation = window.location.origin + path;
		instance.record(config.ackee_domainId, attributes);
	}
}

export default onNavigate;
