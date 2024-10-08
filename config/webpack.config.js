const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')
const aliyunTheme = require('@ant-design/aliyun-theme');
const { getThemeVariables } = require('antd/dist/theme');
// 需要通过 cross-env 定义环境变量
const isProduction = process.env.NODE_ENV === "production";
const htmlTitle = 'react项目';
const packageName = require('../package.json').name;
const getStyleLoaders = (preProcessor) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    {
      loader: 'css-loader',
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor && {
      loader: preProcessor,
      options:
        preProcessor === "less-loader"
          ? {
            // antd的自定义主题
            lessOptions: {
              modifyVars: aliyunTheme.default,
              // {
              //   // 其他主题色：https://ant.design/docs/react/customize-theme-cn
              //   "@primary-color": "#9540b9", // 全局主色
              // },
              // modifyVars: getThemeVariables({
              //     dark: true, // 开启暗黑模式
              //     compact: true, // 开启紧凑模式
              // }),
              javascriptEnabled: true,
            },

          }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
    publicPath: isProduction ? '/dist/' : '/',
    // library: `${packageName}-[name]`,
    // libraryTarget: 'umd',
    // jsonpFunction: `webpackJsonp_${packageName}`,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            exclude: [/\.module\.(css|less)/, /\.global\.less$/],
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            exclude: [/\.module\.(css|less)/, /\.global\.less$/],
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            exclude: [/\.module\.(css|less)/, /\.global\.less$/],
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            exclude: [/\.module\.(css|less)/, /\.global\.less$/],
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
          },
          {
            test: /\.(jsx|js)$/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
              plugins: [
                // "@babel/plugin-transform-runtime",  // presets中包含了
                !isProduction && "react-refresh/babel",
                isProduction && "transform-remove-console",
                // style 设置为  true  引入 antd 的主题 less 变量
                ['import', { libraryName: 'antd', style: true }],
              ].filter(Boolean),
            },
          },

          // 解决样式隔离的问题
          {
            //.module.css;.module.less文件解析，添加css modules，防止样式感染
            test: /\.module\.(css|less)/, //匹配到less结尾的文件
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: isProduction ? '[local]_[hash:base64]' : '[path][name]__[local]'
                  }
                }
              },
              'postcss-loader',
              'less-loader'
            ]
          }
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: [".js", ".jsx"],
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      title: htmlTitle,
      // 这个地址是相对于绝对路径下的 public 目录的意思
      favicon: './public/favicon.ico',

    }),
    isProduction &&
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),

    // 将public下面的资源复制到dist目录去（除了index.html）
    isProduction && new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          },
        },
      ],
    }),

    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),

    ///全局变量 设置
    new webpack.DefinePlugin({
      NODE_SERVICE_URL: JSON.stringify(isProduction ? 'http://localhost:80/api' : '/api/'),
    }),


  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    // 压缩的操作
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all",
      // 其他都用默认值
      cacheGroups: {
        // layouts通常是admin项目的主体布局组件，所有路由组件都要使用的
        // 可以单独打包，从而复用
        // 如果项目中没有，请删除
        layouts: {
          name: "layouts",
          test: path.resolve(__dirname, "../src/layouts"),
          priority: 40,
        },
        // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        antd: {
          name: "chunk-antd",
          test: /[\\/]node_modules[\\/]antd(.*)/,
          priority: 30,
        },
        // 将react相关的库单独打包，减少node_modules的chunk体积。
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          chunks: "initial",
          priority: 20,
        },
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重最低，优先考虑前面内容
          chunks: "initial",
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".jsx", '...'],
    alias: {
      "@": path.resolve(__dirname, "../src"), // 目录快捷方式配置
    },
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 3001,
    hot: true,
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },

  },
  // 给定一个创建后超过 250kb 的资源
  // performance: {
  //   hints: false,
  // },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
};