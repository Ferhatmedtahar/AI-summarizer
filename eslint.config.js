import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
// import tseslint from 'typescript-eslint'; // Remove this if you want to remove TypeScript checking

export default {
  ignores: ["dist"],
  extends: [
    js.configs.recommended,
    // ...tseslint.configs.recommended, // Comment out or remove this line
  ],
  files: ["**/*.{js,jsx,ts,tsx}"], // Adjust to include both JS and TS files if needed
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Disable or remove any TypeScript-specific rules if necessary
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
