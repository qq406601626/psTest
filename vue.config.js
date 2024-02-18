'use strict'
const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin') // 引入gzip压缩插件
function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.port || process.env.npm_config_port || 8082 // dev port

module.exports = {
  // 部署应用时的基本 URL
  publicPath: './',
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: 'index.html',
  lintOnSave: !isProd,
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    open: true, // 设置自动打开
    hot: true,
    port: port,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  // 是否打包为多页面应用: settings.isMultiPage true || false
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  // 构建多页面应用，页面的配置
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // Babel 显式转译列表
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题
    // 可以在index.html中访问它来注入正确的标题。
    name: 'test', // 浏览器的地址栏上的系统名称
    // cdn 引入 --医院使用内网,因此不允许使用cdn
    externals: {
      // 'vue': 'Vue',
      // 'vuex': 'Vuex',
      // 'element-ui': 'ELEMENT',
      // 'Axios':'axios'
    },
    resolve: { // 配置解析别名--可以简写文件路径
      extensions: ['.js', '.json', '.vue', '.scss', '.css'],
      alias: {
        '@': resolve('src'),
        // 以下可以不使用, 直接使用@一样能解决简写所有路径
        '@p': resolve('./pubilc'),
        '@u': resolve('./utils'),
        '@s': resolve('./src/assets/style'),
        '@i': resolve('./src/assets/image')
      }
    },
    plugins: [
      // new CompressionPlugin({ // gzip压缩配置
      //   test: /\.js$|\.html$|\.css/, // 匹配文件名
      //   // threshold: 4096, // 对超过4kb的数据进行压缩
      //   threshold: 10240, // 对超过10kb的数据进行压缩
      //   minRatio: 0.8,
      //   deleteOriginalAssets: false // 是否删除原文件
      // })
    ],
    // web打包体积提示
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议开启预加载
    /* config.plugin('preload-home').tap(() => [{
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }]) */

    // 当有很多页面时，会产生很多无意义的请求
    // config.plugins.delete('prefetch')// prefetch-htmlFile

    // 设置svg图标路径 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(isProd,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              // chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-common',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true,
                  enforce: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          // config.optimization.runtimeChunk('single')
          /* config.optimization.runtimeChunk({
            name: entrypoint => `runtime~${entrypoint.name}`
          }) */
        }
      )
  },
  // css的处理
  css: {
    // requireModuleExtension: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      sass: {
        // data: ` //这儿的键名改了
        // 分号不能删除
        // prependData: `@import"@/assets/styles/common/variables.scss";`,
        // 解决Element-ui的icon被编译成unicode,而导致其乱码的问题 (sass版本需要为"sass": "^1.39.0",以上)
        // sassOptions: {
        //   outputStyle: 'expanded'
        // }
      }
    },
    sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    // 禁止css顺序检查
    // 禁止css顺序检查
    extract: isProd ? {
      ignoreOrder: true
    } : false
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  // parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
}
