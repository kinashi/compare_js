path = require 'path'
webpack = require 'webpack'
BowerWebpackPlugin = require 'bower-webpack-plugin'

config = require path.join(__dirname, 'config.coffee')

module.exports = {
  entry: path.join(config.jsDir, 'entry.js')
  output:
    path: './public'
    filename: 'bundle.js'
  resolve:
    modulesDirectories: ['node_modules']
    extensions: ['', '.js']
  module:
    loaders: [
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    ]
  plugins: [
    # new webpack.optimize.DedupePlugin()
    # new webpack.optimize.UglifyJsPlugin(
    #   compress:
    #     warnings: false
    # )
    new BowerWebpackPlugin(
      modulesDirectories: ['bower_components'],
      manifestFiles: 'bower.json',
      includes: /.js/,
      excludes: [],0
      searchResolveModulesDirectories: true
    )
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
  ]
}
