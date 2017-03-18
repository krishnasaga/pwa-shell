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
const ManifestPlugin = require('webpack-manifest-plugin');
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
	  shell: './src/shell.js',
	  content: './src/content.js'
	},
	output: {
		filename: '[name].build.js',
		path: path.join(__dirname, 'docs'),
		publicPath: '.',
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)?$/,
			exclude: /node_modules/,
			loaders: ['babel-loader'],
		},
		{
			test: /\.(png|jpg)?$/,
			exclude: /node_modules/,
			loaders: ['file-loader?name=[name].[ext]'],
		},
		{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				filename: '[name].css',
				use: combineLoaders([{
					loader: 'css-loader',
					query: {
						localIdentName: '[name]__[local]___[hash:base64:5]',
						minimize: true,
					},
				}, {
					loader: 'sass-loader',
					optinos: {
					  includePaths: 'node_modules'
					}
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
		new ExtractTextPlugin({ filename: '[name].css' } )
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
