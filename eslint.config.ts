import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		rules: {
			"no-console": "warn",
            "no-unused-vars": "warn",
		},
	},
])
