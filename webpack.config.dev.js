var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OfflinePlugin = require('offline-plugin')

var extcss = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader?sourceMap'
})

module.exports = {
	entry: {
		app: ['whatwg-fetch', 'babel-polyfill', './src/index.js'],
		vendor: ['vue', 'bootstrap-vue', 'vue-router']
	},
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
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
				test: /\.vue$/,
				options: {
					loaders: {
						css: extcss
					}
				}
			},
			{
				test: /\.css/,
				use: extcss
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
				loader: 'url-loader?limit=10000000'
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: '.eslintrc'
				}
			}
		}),
		new HtmlWebpackPlugin({
			title: 'WynnStats',
			filename: 'index.html',
			template: 'src/index.ejs',
			inject: false
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new CopyWebpackPlugin([{
			from: './src/404.html',
			to: '404.html'
		}, {
			from: './src/manifest.json',
			to: 'manifest.json'
		}, {
			from: './src/favicon.ico',
			to: 'favicon.ico'
		}, {
			from: './src/appicon.png',
			to: 'appicon.png'
		}]),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js'
		}),
		new OfflinePlugin({
			caches: 'all'
		})
	],
	devServer: {
		port: process.env.PORT || 3000,
		contentBase: './dist',
		inline: true,
		stats: 'errors-only',
		historyApiFallback: {
			index: 'index.html'
		}
	},
	devtool: 'source-map'
}