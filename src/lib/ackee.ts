import { ackee } from "$lib/config"
import { browser } from "$app/env"
import * as ackeeTracker from "ackee-tracker"

let instance: ackeeTracker.AckeeInstance;

if (browser) {
	instance = ackeeTracker.create(
		ackee.server,
		{
			detailed: ackee.detailed,
			ignoreLocalhost: ackee.ignoreLocalhost
		}
	);
}

async function onNavigate(path: string) {
	if (browser) {
		// `as true` avoids overload type error. see: https://github.com/microsoft/TypeScript/issues/24413
		let attributes = ackeeTracker.attributes(ackee.detailed as true);
		attributes.siteLocation = window.location.origin + path;
		instance.record(ackee.domainId, attributes);
	}
}

export default onNavigate;
