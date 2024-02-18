
# ysjk
统一登录门户web
## 设置私服地址
```
npm set registry http://192.168.100.32:4873/
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 一、目录结构
```
├── dist                       # 打包后的文件
├── public                     # 静态资源
│   │── favicon.ico            # 浏览器favicon图标
│   └── index.html             # html模板
├── src                        # 源代码--所有和业务相关的源代码都在src下
│   ├── api                    # 所有请求
│       │── api-modules        # 页面接口请求的模块化api
│       │── api-request        # api-request请求相关的 都在其下
│       └── api                # 页面接口请求all-api
│   │── assets                 # 静态资源 样式 项目所有svg icon
│       │── icon               # 项目所有svg icon
│       │── imgage             # 项目所有img
│       └── style              # 样式style
│   ├── components             # 公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局过滤器 filter
│   ├── layout                 # 全局 layout (头,尾,侧边栏)
│   ├── mixins                 # 混入
│   ├── plugins                # 第三方插件 plugins
│   ├── route                  # route路由 (仅开发阶段左侧侧边栏展示,生产阶段都是多页面,路由无效!!!)
│   ├── store                  # 全局 store管理 (仅当前页面内,多组件传值可用,页面间传值,禁止使用!!!)
│   ├── utils                  # 全局公用方法集
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│       ├── xxx                # 当前xxx页面 (【文件夹名称+html必须保持一致】,具体请参见: src\utils\vue-multiple-page.js)
│           │── index.vue      # 当前xxx的vue逻辑代码
│           │── xxx.html       # 当前xxx页面的html
│           └── app.js         # 当前页面的app.js === 单页面的main.js
│   └── sttings.js             # 配置管理 sttings
├── .env.xxx                   # 环境变量配置 (后续可能是多服务,因此暂时不使用)
├── .eslintignore              # eslint 配置忽略提交至git仓库
├── .eslintrc.js               # eslint 配置项
├── babel.config.js            # babel-loader 配置
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```