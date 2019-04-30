/*
 * webpack生产环境配置
 * @Author: Magical
 */

const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
	mode: 'production',
	module:{
		rules:[
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },  //支持在浏览器查看样式源文件
						{
							loader:'postcss-loader',
							options: {
								ident: 'postcss',
								plugins:  [
									require('postcss-flexbugs-fixes'),
									autoprefixer({
										browsers: [
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9', // doesn't support IE8 anyway
										],
										flexbox: 'no-2009',
									}),
								]
							}

						},
						'sass-loader'
					]
				}),
			},
		]
	},
	plugins: [
		// 每次打包前先清空根目录下得dist/文件
		new CleanWebpackPlugin({ verbose: true }),
		// 分离样式到单独css文件
		new ExtractTextPlugin({
			filename: "css/[name].css"
		}),
		// webpack.optimization.runtimeChunk = true,       //自动拆分运行时的公共文件   
	]
});