const CracoAlias = require('craco-alias')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				// baseUrl SHOULD be specified
				// plugin does not take it from tsconfig
				baseUrl: '.',
				/* tsConfigPath should point to the file where "baseUrl" and "paths" 
             are specified*/
				tsConfigPath: './tsconfig.paths.json',
			},
		},
	],
	webpack: {
		// loadable component 套件，讓打包時編譯出 loadable-stats.json file 之後給 Server-Side Rending 使用
		plugins: [new LoadablePlugin()],
	},
}
