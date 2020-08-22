module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        '@vue/typescript/recommended',
    ],
    plugins: ["@typescript-eslint"],
    parser: "vue-eslint-parser",
	parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/ban-ts-ignore': 0,
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-member-accessibility": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-misused-new": "warn",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unused-vars-experimental": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        "@typescript-eslint/unified-signatures": "warn",
        "@typescript-eslint/brace-style": "warn",
        "@typescript-eslint/comma-spacing": ["warn", {"before": false, "after": true}],
        "@typescript-eslint/default-param-last": "warn",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/func-call-spacing": ["warn", "never"],
        "no-extra-parens": "off",
        "@typescript-eslint/no-extra-parens": ["warn"],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": ["warn"],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": ["warn"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "quotes": "off",
        "@typescript-eslint/quotes": ["warn", "double"],
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-this-alias": "off",
        //######### Estos tres siguientes estan para que compile #############
        "@typescript-eslint/no-unsafe-call": "off", //warn
        "@typescript-eslint/no-unsafe-assignment": "off", //warn
        "@typescript-eslint/no-unsafe-member-access": "off", //warn
        //###################################################################
		'max-len': [
			'warn',
			{
				code: 150,
				ignoreComments: true,
				ignoreUrls: true,
			},
        ],
    },
    "overrides": [
    {
        "files": ["src/**/*.ts"]
    }]
}