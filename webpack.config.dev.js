const cfg = require('./webpack.config.base')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

cfg.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"development"'
		}
	})
)
cfg.plugins.push(
	new HtmlWebpackPlugin({
		title: 'WynnStats',
		filename: 'index.html',
		template: 'src/index.ejs',
		inject: false
	})
)
cfg.devServer = {
	port: process.env.PORT || 3000,
	contentBase: './dist',
	inline: true,
	stats: 'errors-only',
	historyApiFallback: {
		index: 'index.html'
	}
}
cfg.devtool = 'source-map'

module.exports = cfg
