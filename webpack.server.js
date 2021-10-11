const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	entry: './server/index.tsx',
	target: 'node',
	mode: 'development',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js', // [name] 意思為 依照 Chunk 名稱( 預設 Main )生成對應的檔案。
	},
	watch: true,
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
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
