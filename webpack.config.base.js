const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		app: ['whatwg-fetch', 'babel-polyfill', './src/index.js']
	},
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				loader: 'eslint-loader',
				enforce: 'pre',
				test: /(\.js$|\.vue$)/,
				exclude: /node_modules/
			},
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				loader: 'vue-loader',
				test: /\.vue$/
			},
			{
				loader: 'css-loader',
				test: /\.css/
			},
			{
				loader: 'url-loader?limit=10000000',
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/
			}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.runtime.esm.js',
			'@': path.resolve('./src')
		},
		extensions: ['*', '.js', '.vue', '.css']
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: '.eslintrc'
				}
			}
		}),
		new CopyWebpackPlugin([
			{
				from: './src/404.html',
				to: '404.html'
			},
			{
				from: './src/manifest.json',
				to: 'manifest.json'
			},
			{
				from: './src/favicon.ico',
				to: 'favicon.ico'
			},
			{
				from: './src/appicon.png',
				to: 'appicon.png'
			}
		])
	]
}
