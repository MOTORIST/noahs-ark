const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    web: ['./src/index.js', './src/blocks/main.scss'],
    electron: ['./src/electron/index.js', './src/blocks/main.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]/bundle.js?[contenthash]',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public', 'web'),
    index: 'web/index.html',
    compress: false,
    port: 9000,
  },
  target: 'electron-main',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'web/index.html',
      inject: 'body',
      chunks: ['web'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'web/styles.css',
    }),
    new CopyPlugin([{ from: 'icons', to: 'web/icons' }]),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'img',
              publicPath: 'img',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
