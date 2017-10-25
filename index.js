
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const projectBasePath = require('path').resolve(__dirname, './');


require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack.config.babel.js',
        verbose: true
      }
    ],
    'transform-es2015-modules-commonjs'
  ]
});


require('babel-polyfill');
require('es6-promise').polyfill();

if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./build/server/server.bundle');

  });

} else {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./server/server');

  });

};
