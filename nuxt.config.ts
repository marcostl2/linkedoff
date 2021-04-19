import colors from "vuetify/es5/util/colors";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "LinkedOff",
    title: "linkedOff",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      },
    ],
  },

  router: {
    middleware: ["auth"],
  },

  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/normalize.scss"],

  server: {
    host: "0.0.0.0", // default: localhost
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/leaflet.client.ts", ssr: false },
    { src: "~/plugins/persistedState.client.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: "@/components", pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-leaflet",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBsVpNGbBqFB7YMKoFtf5C-mwIv-d3JQgU",
          authDomain: "linkedoff-fe708.firebaseapp.com",
          projectId: "linkedoff-fe708",
          storageBucket: "linkedoff-fe708.appspot.com",
          messagingSenderId: "153857899725",
          appId: "1:153857899725:web:00e31b17f40c6c06e67d84",
          measurementId: "G-8T5XP47G6Y",
        },
        services: {
          auth: {
            persistence: "local", // default
            initialize: {
              // onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
              // onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false,
            },
            ssr: false, // default
          }, // Just as example. Can be any other service.
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
        },
        // lazy: true,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/scss/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "#32B295",
          grey01: "#F3F3F3",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
