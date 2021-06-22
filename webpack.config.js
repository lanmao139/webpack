const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const opimizeCss = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2, // 同时引用了2次才打包
        },
        // 打包第三方库的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        }
      }
    },
    runtimeChunk: { name: 'manifest' }, // 运行时代码
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new opimizeCss()
    ]
  },
  mode: "production",
  entry: {
    "index": './pages/index/index.js',
    "home": './pages/home/home.js',
    "detail": './pages/detail/detail.js',
    "answer": './pages/answer/answer.js',
    "consult": './pages/consult/consult.js',
    "communicate": './pages/communicate/communicate.js',
    "star": './pages/star/star.js',
    "refuse": './pages/refuse/refuse.js',
    "setting": './pages/setting/setting.js',
    "history": './pages/history/history.js',
    "consulting": './pages/consulting/consulting.js',
    "myposter": './pages/myposter/myposter.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'js/[name]-bundle.js?[hash]',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/static/'
    : '/',
  },
  devServer: {
    port: '8090', //默认是8080
    contentBase: path.join(__dirname, "dist"),
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: true, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩
    proxy: { // 代理接口
      '/request': {
        target: 'https://api.xinxike.net', // 后端联调地址
        changeOrigin:true,
        pathRewrite: {
          '^/request':''
        }
      },      
    }    
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 3
                }
              ]
            ]
          }
        },
        exclude: /node_modules/ //排除 node_modules 目录，
      },
      {
        test: /\.css$/,
        use: [{
            loader: miniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 5 * 1024,
                outputPath: 'img',
                name: '[name].[ext]',
                esModule:false
            }
          },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      }, 
      {
        test:/\.(htm|html)$/i,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index/index.html', // 源html文件
      filename: './index.html', //打包后的文件名
      chunks: ['index'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/home/home.html', // 源html文件
      filename: './home.html', //打包后的文件名
      chunks: ['home'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/detail/detail.html',
      filename: './detail.html', 
      chunks: ['detail'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/answer/answer.html',
      filename: './answer.html', 
      chunks: ['answer'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/consult/consult.html',
      filename: './consult.html', 
      chunks: ['consult'],
      minify: false
    }),  
    new HtmlWebpackPlugin({
      template: './pages/communicate/communicate.html',
      filename: './communicate.html', 
      chunks: ['communicate'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/star/star.html',
      filename: './star.html', 
      chunks: ['star'],
      minify: false
    }),         
    new HtmlWebpackPlugin({
      template: './pages/refuse/refuse.html',
      filename: './refuse.html', 
      chunks: ['refuse'],
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './pages/setting/setting.html',
      filename: './setting.html', 
      chunks: ['setting'],
      minify: false
    }),   
    new HtmlWebpackPlugin({
      template: './pages/history/history.html',
      filename: './history.html', 
      chunks: ['history'],
      minify: false
    }),       

    new HtmlWebpackPlugin({
      template: './pages/consulting/consulting.html',
      filename: './consulting.html', 
      chunks: ['consulting'],
      minify: false
    }),  
    new HtmlWebpackPlugin({
      template: './pages/myposter/myposter.html',
      filename: './myposter.html', 
      chunks: ['myposter'],
      minify: false
    }),     
    new miniCssExtractPlugin({
      filename: 'css/[name].css', //输出的css文件名，放置在dist目录下
    }),
    new CleanWebpackPlugin(),
  ],
  // devtool: 'cheap-module-source-map' //开发模式下比较推荐的一个值

}