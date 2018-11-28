module.exports = {
    "extends": "airbnb",
	"env": {
		"browser": true,
		"jasmine": true,
	},
	"rules": {
		"arrow-body-style": ["error", "always"],
		"quote-props": ["error", "always"],
		"prefer-const": 0,
		"import/newline-after-import": 0,
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] } ],
		"react/destructuring-assignment": 0,
		"jsx-quotes": ["error", "prefer-single"]
	}
};