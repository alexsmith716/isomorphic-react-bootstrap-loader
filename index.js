
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const projectBasePath = require('path').resolve(__dirname, './');

require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack/webpack.config.babel.js',
        verbose: true
      }
    ],
    'transform-es2015-modules-commonjs'
  ]
});

console.log('>>>>>>>>>>>>>>1 INDEX.js > process.env.BOOTSTRAPRC_LOCATION: ', process.env.BOOTSTRAPRC_LOCATION);
console.log('>>>>>>>>>>>>>>1 INDEX.js > process.env.NODE_ENV: ', process.env.NODE_ENV);

require('babel-polyfill');

if (process.env.NODE_ENV === 'production') {

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    require('./build/server/server.bundle');

  });

} else {

  console.log('>>>>>>>>>>>>>>2 INDEX.js > process.env.BOOTSTRAPRC_LOCATION: ', process.env.BOOTSTRAPRC_LOCATION);
  console.log('>>>>>>>>>>>>>>2 INDEX.js > process.env.NODE_ENV: ', process.env.NODE_ENV);

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig).server(projectBasePath, () => {

    console.log('>>>>>>>>>>>>>>3 INDEX.js > process.env.BOOTSTRAPRC_LOCATION: ', process.env.BOOTSTRAPRC_LOCATION);
    console.log('>>>>>>>>>>>>>>3 INDEX.js > process.env.NODE_ENV: ', process.env.NODE_ENV);
    require('./server/server');

  });

};
