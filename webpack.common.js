const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.tsx",
    options: "./src/options/index.tsx",
    background: "./src/background-scripts/index.ts",
    content: "./src/content-scripts/index.ts"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: (pathData) => {
      if (pathData.chunk.name === "background") {
        return "background-scripts/index.js";
      } else if (pathData.chunk.name === "content") {
        return "content-scripts/index.js"
      } else {
        return "[name]/index.js";
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/index.html",
      filename: "popup/index.html",
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: "./src/options/index.html",
      filename: "options/index.html",
      chunks: ['options']
    }),
    new CopyPlugin({
      patterns: [
        {from: "./src/manifest.json"}
      ]
    }),
    new CopyPlugin({
      patterns: [
        {from: "./src/assets", to: "assets/"}
      ]
    })
  ],
}