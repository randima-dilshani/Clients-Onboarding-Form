import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // ✅ Allow using `any` (disable strict error)
      "@typescript-eslint/no-explicit-any": "off",

      // (Optional) Make other rules warnings instead of errors
      "@next/next/no-img-element": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
];
