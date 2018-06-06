const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/client/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],

      },
      {
        test: /\.svg|.png|.jpg$/,
        loader: 'url-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader'
      // },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
};
