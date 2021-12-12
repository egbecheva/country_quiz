const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' //This is a webpack helper which allows to transpile Javascript files with babel and webpack. It uses babel under the hood
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader' //Install HTML web pack plugin and HTML loader for displaying our page
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(sass|less|css)$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
