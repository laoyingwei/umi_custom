const path = require("path")
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const getStyleLoaders = (preProcessor) => {
  return [
    "style-loader",
    "css-loader",
    {
      loader:'postcss-loader',
      options:{
        postcssOptions:{
          plugins:[
            'postcss-preset-env'
          ]
        }
      }
    },
    preProcessor
  ].filter(Boolean)
}
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output:{
    path:undefined,
    filename: "static/js/[name].js",
    chunkFilename:"static/js/[name].chunk.js",
    assetModuleFilename:"static/js/[hash:10][ext][query]"
  },
  module:{
    rules:[
      {
        oneOf:[
          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader")
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader")
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader")
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/,
            type:'asset',
            parser:{
              dataUrlCondition:{
                maxSize: 10 * 1024
              }
            }
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type:'asset/resource'
          },
          {
            test: /\.(jsx|js)$/,
            include: path.resolve(__dirname,"../src"),
            loader:"babel-loader",
            options:{
              cacheDirectory: true,
              cacheCompression:false,
              plugins:[
                "react-refresh/babel" //开启js的HMR功能
              ]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname,"../src"),
      exclude: "node_modules",
      cache:true,
      cacheLocation:path.resolve(__dirname,"../node_modules/.cache/.eslintcache")
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,"../public/index.html")
    }),
    new ReactRefreshWebpackPlugin(), // 解决js的HMR功能运行时全局变量的问题
    new CopyPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,"../public"),
          to:path.resolve(__dirname,"../dist"),
          toType:"dir",
          noErrorOnMissing:true,
          globOptions:{
            ignore: ["**/index.html"],
          },
          info:{
            minimized: true,
          }
        }
      ]
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
  optimization:{
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk:{
      name: (entrypoint) => `runtime~${entrypoint.name}`
    }
  },
  resolve:{
    extensions: [".jsx",".js",".json"] ///自动补全文件扩展名，让jsx可以使用
  },
  devServer:{
    open:false,
    host:"localhost",
    port:3000,
    hot:true,
    compress: true,
    historyApiFallback: true, // 解决react-router刷新404问题
  },
  mode: "development",
  devtool:"cheap-module-source-map",
}