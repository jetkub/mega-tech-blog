/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./views/**/*.{html,js,handlebars}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', 'sans-serif', defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		require('@tailwindcss/forms'),
		require('daisyui'),
	],
	daisyui: {
		themes: ['dracula'],
	},
};
