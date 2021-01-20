import * as ackeeTracker from "ackee-tracker";

export default ({app, env}) => {

    let instance = ackeeTracker.create({
        server: env.ackee.server,
        domainId: env.ackee.domainId
    }, {
        detailed: env.ackee.detailed,
        ignoreLocalhost: env.ackee.ignoreLocalhost
    });

    app.router.afterEach(() => {

        let attributes = ackeeTracker.attributes(env.ackee.detailed);
        attributes.siteLocation = window.location.origin + window.location.pathname
        instance.record(attributes);

    });

}