# react-koa-ssr
基于react和koa搭建的ssr demo项目
### 技术栈
react16 + koa2 + webpack4 + babel7

webpack.config.client.js 用于客户端 webpack 构建
webpack.config.server.js 用于服务端 webpack 构建

## 本地调试命令
- CSR 渲染
1）`$ npm install` 安装依赖
2）`$ npm run client` 进行客户端构建打包，并开启 webpack-dev-server
3）浏览器访问 `https://127.0.0.1:8080`

- SSR 渲染
1）`npm install` 安装依赖
2）`npm run server` 进行客户端构建打包，并开启 node 服务
3）浏览器访问 `https://127.0.0.1:3000`

### 运行原理
1. CSR 方式
2. SSR 方式

### 依赖模块
1. koa
基于 Node.js 的 web 开发框架

2. nodemon
node服务自动重启工具，可以监听代码文件的变动，当代码改变之后，自动重启。

3. Babel
Babel 能够转换 JSX 语法
Babel 将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法。
babel-loader 会允许你使用 Babel 和 webpack 转译 JavaScript 文件。
@babel/register require 钩子 将自身绑定到 node 的 require 模块上，并在运行时进行即时编译。
可直接通过 @babel/register 将 jsx、es6 代码运行在 Node 环境.

4. Webpack
Webpack 是 JavaScript 应用程序的静态模块打包工具。
webpack 中通过设置 target 为 node，会编译为用于类 Node.js 环境。
html-webpack-plugin 可生成 html5 文件，可以处理随着编译而发生变化哈希的 webpack bundle 文件。
extract-text-webpack-plugin：scss、antd、css分离插件【暂未使用】

5. webpack-dev-server
提供了一个简单的 web server，并且具有热更新的功能。

6. koa-router
服务端路由

7. koa-static
通过 koa-static 中间件加载某个目录下的静态资源

8. axios
可在浏览器和 node 服务器运行的 http 请求库
Promise based HTTP client for the browser and node.js

### react ssr 渲染原理
1. 基本原理
ReactDOMServer 对象允许你将组件渲染成静态标记。通常，它被使用在 Node 服务端上。
其方法 renderToString() 可被使用在服务端和浏览器环境，可以使用此方法在服务端生成 HTML，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 SEO 优化的目的。

使用 ReactDOM.hydrate() 方法渲染 React 组件，React 将不会重复创建已被服务端标记的节点，只进行事件处理绑定。

2. 数据同构
数据注水：服务端预请求数据，以 props 方式传递给 React 组件渲染。
数据脱水：暂使用 window 对象的方法，后续可改为 context 传递。

3. 路由同构

4. 有登录态的数据请求
node 端将 request 请求中的 cookie 透传给 axios，并将 cookie 设置在 axios 的 header中。