module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },

  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/recommended",
    "plugin:vue/base",
  ],
  parser: "vue-eslint-parser",
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: ["error", "double"],
    "prettier/prettier": 0,
    "vue/no-v-html": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    "prefer-const": "off",
    "vue/html-indent": "off",
    "vue/attribute-hyphenation": "off",
    "vue/require-default-prop": "off",
  },
};
