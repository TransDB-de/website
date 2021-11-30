/**
 * Env var wrapper.
 * Change these settings by setting the vars in the `.env` file.
 * You can also use a `.env.production` file to overwrite the defaults only for production environments.
 */
const config = {
	ackee: {
		server: import.meta.env.CLIENT_ACKEE_SERVER as string,
		domainId: import.meta.env.CLIENT_ACKEE_DOMAIN_ID as string,
		ignoreLocalhost: import.meta.env.CLIENT_ACKEE_IGNORE_LOCALHOST as boolean,
		detailed: import.meta.env.CLIENT_ACKEE_DETAILED as boolean
	}
};

export default config;
export const { ackee } = config;
