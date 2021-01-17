export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "Trans*db",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" }
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
        "~/plugins/auth-redirect.js"
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

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: "https://transdb-preview.hamsterlabs.de/api/"
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
    }
}
