var path = require('path')
var webpack = require('webpack')
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
				test: /\.vue$/
			},
			{
				loader: 'style-loader!css-loader',
				test: /\.css/
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=10000000'
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