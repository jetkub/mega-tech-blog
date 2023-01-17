/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./*.{html,js}'],
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
		themes: [
			{
				customNight: {
					primary: '#3ABFF8',
					secondary: '#828DF8',
					accent: '#F471B5',
					neutral: '#1D283A',
					'base-100': '#191f2e',
					info: '#0CA6E9',
					success: '#2BD4BD',
					warning: '#F4C152',
					error: '#FB6F84',
				},
			},
			'light',
			'dark',
			'cupcake',
			'emerald',
			'corporate',
			'synthwave',
			'wireframe',
			'business',
		],
	},
};
