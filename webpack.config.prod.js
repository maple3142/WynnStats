const cfg = require('./webpack.config.base')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

cfg.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
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
cfg.plugins.push(
	new UglifyJsPlugin({
		uglifyOptions: {
			compress: {
				warnings: false
			},
			comments: false
		}
	})
)
cfg.plugins.push(
	new OptimizeCssAssetsPlugin({
		cssProcessorOptions: {
			safe: true,
			discardComments: {
				removeAll: true
			}
		}
	})
)
module.exports = cfg
