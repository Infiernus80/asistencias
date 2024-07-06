const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	entry: WebpackWatchedGlobEntries.getEntries([
		path.resolve(__dirname, 'src/**/*.ts'),
	]),
	mode: 'production',
	watch: false,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.html$/i,
				type: 'asset/resource',
			},
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new WebpackWatchedGlobEntries(),
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: '**',
					//to: '[path][name][ext]',
					context: 'src',
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ['**/*.ts', '**/.gitkeep'],
					},
				},
			],
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin()],
	},
};
