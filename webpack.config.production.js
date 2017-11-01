const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
    vendor: [
      'lodash',
      'moment',
      'prop-types',
      'query-string',
      'react',
      'react-datepicker',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-textarea-autosize',
      'react-transition-group',
      'redux',
      'redux-thunk',
      'reselect',
      'superagent',
      'sweet-pubsub',
      path.join(__dirname, 'src/vendor/core-js.js'),
      path.join(__dirname, 'src/vendor/sortable.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [require('autoprefixer')()]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { name: '[name]-[hash].[ext]', limit: 15000 }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: { name: '[name]-[hash].[ext]' }
        }]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.scss']
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: path.join(__dirname, 'src/assets/favicon.ico')
    }),
    new InlineChunkWebpackPlugin({
      inlineChunks: ['runtime']
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
