import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";

export default defineConfig(
    {
        ignores: [
            "cypress/**",
            "cypress.config.ts",
        ],
    },
    {
        files: ["**/*.ts"],
        extends: [
            ...tseslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                project: ["tsconfig.app.json", "tsconfig.spec.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "@angular-eslint": angular,
        },
        rules: {
            "@angular-eslint/component-selector": "error",
            "@angular-eslint/directive-selector": "error",
            "@angular-eslint/use-lifecycle-interface": "warn",
            "@angular-eslint/no-empty-lifecycle-method": "warn",
            "@angular-eslint/prefer-inject": "warn",

            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unsafe-assignment": "warn",
            "@typescript-eslint/no-unsafe-return": "warn",
        },
    },
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: templateParser,
        },
        plugins: {
            "@angular-eslint/template": angularTemplate,
        },
        rules: {
            "@angular-eslint/template/banana-in-box": "error",
            "@angular-eslint/template/no-negated-async": "error",
            "@angular-eslint/template/alt-text": "warn",
            "@angular-eslint/template/elements-content": "warn",
            "@angular-eslint/template/label-has-associated-control": "warn",
        },
    }
);