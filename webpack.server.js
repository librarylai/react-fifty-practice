const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	entry: './server/index.tsx',
	target: 'node',
	mode: 'development',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js', // [name] 意思為 依照 Chunk 名稱( 預設 Main )生成對應的檔案。
		// globalObject: 'this'
	},
	watch: true,
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins:[ new TsconfigPathsPlugin() ] // 將 tsconfig.json 的 paths 規則套入到 webpack 中 ex. alias
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: 'tsconfig.server.json',
				},
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
}
