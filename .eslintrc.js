module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint"],
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any:": "warn",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-unnecessary-condition": ["error", {"allowConstantLoopConditions": true}],
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unused-vars-experimental": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/unified-signatures": "warn",
    "@typescript-eslint/brace-style": "warn",
    "@typescript-eslint/comma-spacing": ["warn", {"before": false, "after": true}],
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/func-call-spacing": ["warn", "never"],
    "no-extra-parens": "off",
    "@typescript-eslint/no-extra-parens": ["warn"],
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": ["warn"],
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["warn"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "quotes": "off",
    "@typescript-eslint/quotes": ["warn", "double"]

  },
  "overrides": [
    {
      "files": ["**/*.ts"]
    }
  ]
}
