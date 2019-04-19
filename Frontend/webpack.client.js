const path = require('path');
const webConfig = require('./webConfig.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  // production || development
  mode: webConfig.environment,

  // Tell webpack the root file of our
  // server application 
  // entry: ['./src/client/client.js', './src/assets/scss/styles.scss'],
  entry: [
    './src/client/client.js'
  ],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, 'build/public'),
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
              name: 'assets/webpack-images/[name].[ext]',
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
    new ExtractTextPlugin("./assets/css/styles.min.css"),
  ]

};
