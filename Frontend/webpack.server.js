const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webConfig = require('./webConfig.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  // production || development
  mode: webConfig.environment,

  // Inform webpack that we're building a bundle
  // for nodeJS, rather then for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application 
  entry: './src/server/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/assets/webpack-images/',
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: "extract-loader"
            },
            {
              loader: "css-loader?-url"
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },

    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/static-assets', to: 'public/assets/static-assets' },
      { from: 'src/assets/email_templates', to: 'public/assets/email_templates' }
    ]),
    new ExtractTextPlugin("./public/assets/css/styles.min.css"),
  ],

  // Tell webpack not to bundle any libraries that exist in the 'node_modules' folder
  // into the server bundle
  externals: [webpackNodeExternals()]

};