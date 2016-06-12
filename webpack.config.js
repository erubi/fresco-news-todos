const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'react-hot!babel',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader',
      },
    ],
  },
  postcss() {
    return [autoprefixer, postcssNormalize];
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ],
};

