const path = require("path");
const webpack = require('webpack');

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'index.js'),
		path.join(__dirname, 'dist', 'index.html'),
	],
	module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:  /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.html', '.js', '.jsx'],
    modules: [
      path.join(__dirname),
      "node_modules"
    ]
  },
	output: {
	  path: path.join(__dirname, 'dist'),
	  publicPath: '/',
	  filename: 'bundle.js',
	},
	devServer: {
	  contentBase: './dist',
	},
};