import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom ESLint rules
  {
    rules: {
      // React-specific rule: escape quotes inside JSX
      "react/no-unescaped-entities": "warn",

      // TypeScript-specific rule: unused variable warning
      "@typescript-eslint/no-unused-vars": ["warn"],

      // Optional: Enforce use of const for variables that are never reassigned
      "prefer-const": "warn",

      // Allow single quotes in JSX
      "quotes": ["warn", "single"]
    }
  }
];

export default eslintConfig;
