
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.tools');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

console.log('>>>>>> webpack.config.prod <<<<<<<<');
console.log('>>>> bootstrap-loader configuration: ', `${bootstrapEntryPoints.prod}`);

module.exports = {

  entry: {
    app: [
      'babel-polyfill',
      bootstrapEntryPoints.prod,
      path.join(__dirname, './client/index.js')
    ],
    vendor: [
      'isomorphic-fetch',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-thunk',
    ]
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.join(__dirname, './public/static/dist/client'),
    publicPath: '/public/static/dist/client/'
  },

  module: {
    rules: [

      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]',
                sourceMap: true,
              }
            }, 
            {
              loader: 'postcss-loader',
            }, 
            {
              loader: 'sass-loader',
            }
          ]
        })
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]_[local]_[hash:base64:5]',
                sourceMap: true,
              }
            }, 
            {
              loader: 'postcss-loader',
            }, 
            {
              loader: 'sass-loader',
            }
          ]
        })
      },

      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 20000, mimetype: 'application/font-woff' }
          }
        ]
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/octet-stream' }
          }
        ]
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'file-loader' }
        ]
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'image/svg+xml' }
          }
        ]
      },

      {
        test: /\.(jpe?g|gif|png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      },

      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },
    ]
  },

  resolve: {
    extensions: [ '*', '.js', '.jsx', ],
  },

  devtool: 'hidden-source-map',

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT: JSON.stringify(true)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),


    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),

    new ManifestPlugin({
      basePath: '/'
    }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    }),

    //new SWPrecacheWebpackPlugin({
    //    cacheId: 'my-project-name',
    //    dontCacheBustUrlsMatching: /\.\w{8}\./,
    //    filename: 'service-worker.js',
    //    minify: true,
    //    navigateFallback: PUBLIC_PATH + 'index.html',
    //    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //}),

    //new webpack.optimize.UglifyJsPlugin({
    //  compressor: {
    //    warnings: false,
    //  }
    //}),

  ]
};

// reqiured for jquery:
//{
//  test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
//  use: [
//    {
//      loader: 'imports-loader?jQuery=jquery'
//    }
//  ]
//},
