const path = require('path')
module.exports = {
	entry: './src/index.js',
	output: {
		html: {
			title: 'WynnStats',
			description: 'A browser client can view WynnCraft stats.'
		}
	},
	chainWebpack: config => {
		config.resolve.alias.set('@', path.join(__dirname, './src'))
		config.resolve.extensions.add('.js').add('.vue')
	}
}
