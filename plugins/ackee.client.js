import * as ackeeTracker from "ackee-tracker";

export default ({app, $config}) => {

    let instance = ackeeTracker.create({
        server: $config.ackee.server,
        domainId: $config.ackee.domainId
    }, {
        detailed: $config.ackee.detailed,
        ignoreLocalhost: $config.ackee.ignoreLocalhost
    });

    app.router.afterEach(() => {

        let attributes = ackeeTracker.attributes($config.ackee.detailed);
        attributes.siteLocation = window.location.origin + window.location.pathname
        instance.record(attributes);

    });

}