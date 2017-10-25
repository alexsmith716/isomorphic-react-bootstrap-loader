
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const projectBasePath = require('path').resolve(__dirname, './');

console.log('>>>>>>>> INDEX.js 1 > process.env.BOOTSTRAPRC_LOCATION <<<<<<<<<<<<: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>>> INDEX.js 1 > process.env.NODE_ENV <<<<<<<<<<<<: ', process.env.NODE_ENV);

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

console.log('>>>>>>>> INDEX.js 2 <<<<<<<<<<<<');

if (process.env.NODE_ENV === 'production') {

  console.log('>>>>>>>> INDEX.js 3 <<<<<<<<<<<<');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./build/server/server.bundle');

  });

} else {

  console.log('>>>>>>>> INDEX.js 4 <<<<<<<<<<<<');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    console.log('>>>>>>>> INDEX.js 5 <<<<<<<<<<<<');

    require('./server/server');

  });

};
