/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    // "plugin:prettier/recommended",
    // "prettier",
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: true,
    ecmaVersion: 6,
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "astro/no-set-html-directive": "error",
        "import/no-absolute-path": 1,
      },
    },
  ],
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      typescript: { project: ["./tsconfig.json"] },
    },
  },
  rules: {
    // "prettier/prettier": "warn",
    "import/no-unresolved": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "ban-ts-comment": "off",
    "no-prototype-builtins": "off",
    "no-unsafe-optional-chaining": "off",
    "import/consistent-type-specifier-style": "off",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "*", next: "class" },
      { blankLine: "always", prev: "function", next: "*" },
      { blankLine: "always", prev: "class", next: "*" },
    ],
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "*", next: "class" },
      { blankLine: "always", prev: "*", next: "type" },
      { blankLine: "always", prev: "*", next: "interface" },
      { blankLine: "always", prev: "function", next: "*" },
      { blankLine: "always", prev: "class", next: "*" },
      { blankLine: "always", prev: "type", next: "*" },
      { blankLine: "always", prev: "interface", next: "*" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "react/display-name": "off",
  },
  ignorePatterns: [
    "**/.eslintrc.js",
    "**/.eslintrc.cjs",
    "**/*.config.js",
    "**/*.config.cjs",
    "**/*.config.mjs",
    "dist",
    "pnpm-lock.yaml",
  ],
  reportUnusedDisableDirectives: true,
}

module.exports = config
