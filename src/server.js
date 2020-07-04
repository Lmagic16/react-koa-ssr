const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const Router = require('koa-router');
const serveStatic = require('koa-static');
import ReactDOMServer from 'react-dom/server';
import React from "react";
import App, { getInitData } from './App.jsx';

async function getServerHtml() {
  let res = await getInitData();
  let data = (res && res.data) || [];
  // 数据注水
  let initDataHtml = '<script>window.__server_initial_data__ = ' + JSON.stringify(data) + '</script>';

  //渲染HTML
  const appHtml = ReactDOMServer.renderToString(<App data={data}/>);
  const file = fs.readFileSync(process.cwd() +  '/dist/index.html', 'utf8'); //先去读取index.html的内容
  const serverHtml = file.replace('<div id="server-side-render"></div>', appHtml + initDataHtml); //然后将index.html里面的特殊字段用react渲染好的dom字符串替换
  return serverHtml;
}

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// 路由规则
let router = new Router();
router.get('/', async (ctx) => {
    console.log('ctx.request.header:', ctx.request.header);
  ctx.body = await getServerHtml();
});

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 返回静态资源，这样可以访问到dist中构建的浏览器端运行的js及其他文件
app.use(serveStatic(process.cwd() + '/dist/' ), {
  hidden: 'index.html'
});

//异常处理
app.on('error', function(err, ctx){
    console.log('server error', err, ctx);
});

app.listen(3000);
console.log('Project is running at http://localhost:3000/');
