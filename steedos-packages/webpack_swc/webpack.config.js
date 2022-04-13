const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const swcConfig = require("./.swcrc.js");
const package = require("./package.json");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.join(__dirname, "dist"),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        loader: "swc-loader",
        options: { ...swcConfig(true), sync: true },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.name,
      template: "./public/index.html"
    })
  ],
  devServer: {
    compress: false,
    port: 3000,
    open: false,
    hot: true,
    proxy: {},
  }
}