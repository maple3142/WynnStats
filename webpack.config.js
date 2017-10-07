var path = require('path')
var webpack = require('webpack')
module.exports = {
	entry: ['whatwg-fetch','babel-polyfill','./src/index.js'],
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
				test: /\.vue$/
			},
			{
				loader: 'style-loader!css-loader',
				test: /\.css/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader', {
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// Specifying webp here will create a WEBP version of your JPG/PNG images
							webp: {
								quality: 75
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			vue: process.env.NODE_ENV === 'development' ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
			'@': path.resolve('./src')
		},
		extensions: ['*', '.js', '.vue', '.css']
	},
	plugins: [
		new webpack.DefinePlugin({
			'__DEV__': process.env.NODE_ENV === 'development'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: '.eslintrc'
				}
			}
		})
	],
	devServer: {
		port: process.env.PORT || 3000,
		contentBase: './dist',
		inline: true,
		stats: 'errors-only'
	},
	devtool: 'sourcemap'
}