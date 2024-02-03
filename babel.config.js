module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				"targets": {
					"esmodules": "current",
				},
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		"@babel/plugin-proposal-class-properties",
		["@babel/plugin-transform-typescript", { "allowNamespaces": true }],
	],
};