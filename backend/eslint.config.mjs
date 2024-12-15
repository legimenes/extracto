import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";

export default [
  {files: ["src/**/*.{js,mjs,cjs,ts}"]},
  //{ignores: ["test/**/*"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic/ts": stylisticTs
    }
  },
  {
    rules: {
      "@stylistic/ts/comma-dangle": ["error", "never"],
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/semi": ["error", "always"]
    }
  }
];
