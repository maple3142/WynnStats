var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var extcss = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader?minimize&sourceMap'
})

module.exports = {
	entry: ['whatwg-fetch', 'babel-polyfill', './src/index.js'],
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
				loader: 'url-loader?limit=100000'
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
				NODE_ENV: '"production"'
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
			inject: false,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
				safe: true,
				discardComments: {
					removeAll: true,
				},
			},
		}),
		new CopyWebpackPlugin([{
			from: './src/404.html',
			to: '404.html'
		}])
	],
	devServer: {
		port: process.env.PORT || 3000,
		contentBase: './dist',
		inline: true,
		stats: 'errors-only'
	}
}