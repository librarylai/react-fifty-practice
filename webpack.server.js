const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports ={
	entry:'./server/index.ts',
	target:'node',
	mode: 'development',
	externals:[nodeExternals()],
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
	watch: true,
	resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
	module:{
		rules:[
			{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
				options: {
          configFile: 'tsconfig.server.json',
        },
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
        use: 'babel-loader'
			}
		]
	}
}