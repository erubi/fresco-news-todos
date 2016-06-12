const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
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
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
    }),
  ],
};

