const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = {
	entry: './src/index.js',
	html: {
		title: 'WynnStats',
		description: 'A browser client can view WynnCraft stats.'
	}
}
