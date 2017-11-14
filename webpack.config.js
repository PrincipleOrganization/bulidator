/* eslint-disable no-useless-escape */

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractText = new ExtractTextPlugin({
  filename: '/css/[name].css',
  disable: false,
  allChunks: true,
});

/*
const bootstraprcCustomLocation = './.bootstraprc';
const bootsrapConfig = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' +
  `&configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
  '!bootstrap-loader/no-op.js';


module.exports = [
  {
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      index: './src/server/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      //Atamanskiy: filename: "server.bundle.js" replaced by "filename:'[name].js'"
      filename:'[name].js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
*/
/*
  {
    name: 'client',
    entry: {
      client: ['babel-polyfill', './src/client/index.js'],
      bootstrap: bootsrapConfig,
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
            publicPath: '/dist',
          }),
        },
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['react'],
                  ['es2015', { modules: false }],
                ],
              },
            },
          ],
        },
        {
          test: /\.(woff2?|svg)$/,
          loader: 'url-loader?limit=10000&name=fonts/[name].[ext]',
        },
        {
          test: /\.(ttf|eot)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
        {
          test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
          loader: 'imports-loader?jQuery=jquery',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Bulidator',
        minify: {
          collapseWhitespace: true,
        },
        template: './src/client/index.html',
      }),
      extractText,
      new webpack.NamedModulesPlugin(),
    ],
  },
  ];
  */

//Atamanskiy testing devServer
module.exports =
{
    entry: './src/client/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    module:{
      rules:[
        {test: /\.css$/, use:['style-loader','css-loader']},
        {test: /\.js$/, exclude: /node_modules/, use:['babel-loader']},
        {test: /\.jsx?$/, exclude: /node_modules/, use:['babel-loader']}
      ]
    },
    devServer:{
          contentBase: path.join(__dirname, 'dist'),
          compress: true,
          port: 8080,
          noInfo: true,
          open: true
    },
    plugins: [new HtmlWebpackPlugin({
      title: 'Bulidator',
      template: './src/client/index.html',
    })]
}
