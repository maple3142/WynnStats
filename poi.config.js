module.exports = {
	entry: './src/index.js',
	html: {
		title: 'WynnStats',
		description: 'A browser client can view WynnCraft stats.'
	},
	presets: [require('./poi-preset-sw-precache')()]
}
