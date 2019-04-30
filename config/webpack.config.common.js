/*
 * webpack公用环境配置
 * @Author: Magical
 */

const path = require('path');
// 用于自定义html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
	entry: {
		main:[
			path.resolve(__dirname, '../src/index.js'),
		]
	},

	output: {
		filename: 'js/bundle.js',
		chunkFilename: '[name].chunk.js',
		// 输出文件都放到 dist 目录下
		path: path.resolve(__dirname, '../dist'),
		publicPath: ""
	},

	resolve: {
		extensions: [".js", ".json"],   // 免后缀文件类型
		// 简化路径
		alias: {
			utils: path.resolve(__dirname, '../src/utils/'),
			static: path.resolve(__dirname, '../src/static'),
			components: path.resolve(__dirname, '../src/components'),
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader?cacheDirectory', // 对编译内容进行缓存，提升下次编译速度
					options: {
						presets: [
							'@babel/preset-env',
							"@babel/preset-react",
						],
						plugins: [
							// babel会对一些公用方法使用一些辅助代码，默认情况下她们会添加到每个需要他们的文件中，
							// 引入transform-runtime禁用babel 自动对每个文件的 runtime 注入，并且使所有辅助代码从这里引用。 目的是减少文件大小
							"@babel/transform-runtime",  
							// "react-hot-loader/babel",
							// "transform-decorators-legacy"
						]
					}
				},
				exclude: /(node_modules|bower_components)/,
				
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8888,
							outputPath: 'static/images/',
							name: '[name].[hash:6].[ext]',  //指定打包后的图片名字及路径
							fallback: 'file-loader'         //文件大于8888的交于file-loader
						}
					}
				],
				exclude: path.resolve(__dirname, "../src/static/icons")
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							symbolId: 'yg-[name]'
						}
					}
				],
				include: path.resolve(__dirname, "../src/static/icons")
			},

		]
	},


	plugins: [
		new HtmlWebpackPlugin({
			inject: true,                //讲js文件放在body中
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
			template: path.resolve(__dirname, '../public/index.html'),  //指定模板
		})
	],
};
