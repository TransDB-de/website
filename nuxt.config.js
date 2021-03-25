export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "Trans*db",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Deine Anlaufstelle für Transgender-Unterstützung" },
            { hid: "og:locale", name: "og:locale", content: "de_DE" },
            { hid: "og:title", name: "og:title", content: "Trans*db" },
            { hid: "og:description", name: "og:description", content: "Deine Anlaufstelle für Transgender-Unterstützung" },
            { hid: "og:image", name: "og:image", content: "/logo.png" }
        ],
        link: [
            { rel: "shortcut icon", type: "image/png", href: "favicon.png" },
            { rel: "stylesheet", href: "/fonts/fira_sans.css" },
            { rel: "stylesheet", href: "/fonts/poppins.css" }
        ],
        htmlAttrs: {
            lang: "de"
        }
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        "~/plugins/ackee.client.js",
        "~/plugins/responsive.client.js",
        "~/plugins/smoothScroll.client.js",
        "~/plugins/axios.client.js"
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    loading: false,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxt/content"
    ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {
            if (ctx.isDev) {
                config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
            }
        }
    },

    // global config
    publicRuntimeConfig: {
        // Ackee tracking configuration (https://github.com/bdrtsky/nuxt-ackee)
        ackee: {
            server: process.env.ACKEE_BRWOSER_URL ?? 'http://localhost:3000',
            domainId: process.env.ACKEE_DOMAIN_ID ?? '84fbbfc3-ebc7-4faf-bf7c-018d1d0d2bd0',
            ignoreLocalhost: process.env.ACKEE_IGNORE_LOCALHOST ?? true, // ONLY FOR DEBUG! Set to true in production.
            detailed: process.env.ACKEE_DETAILED ?? true
        },

        head: {
            title: process.env.HEAD_TITLE ?? "Trans*db",
            meta: [
                { hid: "description", name: "description", content: process.env.HEAD_META_DESCRIPTION ?? "Deine Anlaufstelle für Transgender-Unterstützung" },
                { hid: "og:locale", name: "og:locale", content: process.env.HEAD_META_LOCALE ?? "de_DE" },
                { hid: "og:title", name: "og:title", content: process.env.HEAD_TITLE ?? "Trans*db" },
                { hid: "og:description", name: "og:description", content: process.env.HEAD_META_DESCRIPTION ?? "Deine Anlaufstelle für Transgender-Unterstützung" },
            ],
            htmlAttrs: {
                lang: process.env.HEAD_LANG ?? "de"
            }
        },

        // Axios module configuration (https://go.nuxtjs.dev/config-axios)
        axios: {
            baseURL: process.env.API_BRWOSER_URL ?? "http://localhost:1300/"
        }
    },

    // server-side config
    privateRuntimeConfig: {
        // Axios module configuration (https://go.nuxtjs.dev/config-axios)
        axios: {
            baseURL: process.env.API_URL ?? "http://localhost:1300/"
        }
    }
}
