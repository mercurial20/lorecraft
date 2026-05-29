import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:", "^(?!@/|@lorecraft/)(?:@?\\w)"],
            ["^@lorecraft/", "^@/"],
            ["^\\."],
            [
              "^\\u0000.*\\.(?:css|less|sass|scss)$",
              "^.*\\.(?:css|less|sass|scss)$",
              "^\\u0000.*\\.(?:avif|bmp|gif|ico|jpe?g|json|md|otf|png|svg|ttf|txt|webp|woff2?|ya?ml)$",
              "^.*\\.(?:avif|bmp|gif|ico|jpe?g|json|md|otf|png|svg|ttf|txt|webp|woff2?|ya?ml)$",
              "^\\u0000",
            ],
          ],
        },
      ],
    },
  },
]);
