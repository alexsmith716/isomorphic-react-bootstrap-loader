
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {

  debug: false,

  // using Webpack's `resolve.modulesDirectories`
  modulesDirectories: ['node_modules'],

  // enables support for `require.context()` and `require.ensure()` functions
  patch_require: false,

  webpack_assets_file_path: 'webpack-assets.json',

  assets: {

    images: {

      extensions: ['png', 'jpg', 'jpeg', 'gif', ],

      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,

    },

    svg: {

      extension: 'svg',

      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,

    },

    fonts: {

      extensions: [ 'woff', 'woff2', 'ttf', 'eot' ],

      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,

    },

    style_modules: {

      extensions: ['css', 'less', 'scss'],

      filter: function(module, regex, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      },

    },

  },
};
