const cssnext = require('postcss-cssnext');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';

// import .env variables to global space
const dotEnvVars = dotenv.config().parsed;
const defines =
	Object.keys(dotEnvVars)
		.reduce((accumulator, key) => {
			const retAccumulator = accumulator;
			const val = JSON.stringify(dotEnvVars[key]);
			retAccumulator[`__${key.toUpperCase()}__`] = val;
			return retAccumulator;
		}, {
			__NODE_ENV__: JSON.stringify(NODE_ENV),
		});

const config = {
	entry: {
	  shell: './src/shell.js'
	},
	output: {
		filename: '[name].build.js',
		path: path.join(__dirname, 'docs'),
		publicPath: '/pwa-shell',
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)?$/,
			exclude: /node_modules/,
			loaders: ['babel-loader'],
		},{
			test: /\.scss$/,
			loaders: ['file-loader','css-loader','sass-loader'],
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: combineLoaders([{
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[name]__[local]___[hash:base64:5]',
						minimize: isProd,
					},
				}, {
					loader: 'postcss-loader',
				}]),
			}),
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src', 'index.html'),
			MANIFEST_FILENAME: 'manifest.json' 
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					cssnext(),
				],
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('styles.css'),
	],
	resolve: {
		modules: ['node_modules', './client/src', './client/src/shared/modules'],
		extensions: ['.js', '.jsx', '.css','.scss'],
	},
};

if (false) {
	config.entry.unshift(
		'react-hot-loader/patch',
		'webpack/hot/only-dev-server');
	config.devtool = 'source-map';
	config.devServer = {
		inline: true,
		historyApiFallback: true,
		host: '0.0.0.0',
		hot: true,
		port: 3000,
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (true) {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
