const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new CopyPlugin({
        patterns: [
          // Use copy plugin to copy *.wasm to output folder.
          { from: 'node_modules/onnxruntime-web/dist/*.wasm', to: '[name][ext]' },
          { from: 'public/models', to: 'models/[name][ext]' },
          { from: 'public/*.ico', to: '[name][ext]' },
          { from: 'public/*.png', to: '[name][ext]' },
          { from: 'public/*.json', to: '[name][ext]' },
          { from: 'public/*.txt', to: '[name][ext]' },
        ]
      }),
    ],
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      open: true
    }
  };
};