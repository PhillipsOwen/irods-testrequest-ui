import globals from "globals";
import react from "eslint-plugin-react";

// this bit fixes the collision with the React definition of react
react.configs.recommended.plugins = { react };
react.configs.recommended.languageOptions = { parserOptions: react.configs.recommended.parserOptions };
delete react.configs.recommended.parserOptions;

// define the eslint configuration
export default [
  react.configs.recommended,
  {
    plugins: { react },
    files: ["src/**/*.js*"],
    ignores: ["**/*.config.js", "dist/**/*", "build/**/*"],
    settings: { react: {version: "18.2.0"} },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        }},
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "semi": "warn",
      "prefer-const": "warn",
      "no-dupe-args": "warn",
      "no-dupe-keys": "warn",
      "react/display-name": "off"
    },
    linterOptions: { reportUnusedDisableDirectives: "error" }
  }
];
