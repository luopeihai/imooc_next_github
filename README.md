# 师从

参考 慕课网 jokcy 老师课程 [React16.8+Next.js+Koa2 开发 Github 全栈项目](https://coding.imooc.com/class/334.html)

# 投石

前端主流框架 Vue,React 为 SPA(单页面应用)前后端分离应用,seo 没有 ssr(服务端渲染)友好,为了解决这个问题 next.js 出现帮助 React
实现 ssr 应用

# 问路

> 使用的工具和相关技术

- koa JWT Sequelize Validator 与 LinValidator 验证器
- next
- npm create-next-app(next 脚手架)
- nodemon (node 自动编译)
- mysql redis

# bug 妖魔榜

> 一路跟随师傅取经,路上需有 Bug,随花几小时甚至几天才能解决,是一段缘分,一段修行,一段成长,唯有踏平 bug 艰难险阻,才能修得课程正果,此处记载路途 "龙"级灾难 bug

1. bug 还未出现,前进中...

# 取经路

### 项目搭建

1. npm init 初始化
2. npm i react react-dom next -s

### create-next-app 搭建项目

1. 全局安装 next 脚手架 npm i create-next-app -g
2. 创建 next 项目 create-next-app imooc_next_github

### koa 集成到 next 中

1. 安装 koa 包 npm i koa -s
2. 创建根目录启动页 server.js ,添加代码:

```
    const Koa = require("koa");
    const next = require("next");
    //开发状态
    const dev = process.env.NODE_ENV !== "production";
    const app = next({ dev });
    const handle = app.getRequestHandler();

    const PORT = 3001;
    // 等到pages目录编译完成后启动服务响应请求
    app.prepare().then(() => {
    const server = new Koa();

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });

    server.listen(PORT, () => {
        console.log(`koa server listening on ${PORT}`);
    });
    });

```

3. 修改 npm run 指令为: "dev": "node server.js",

### 页面路由跳转

1. 引入 koa 路由库: npm i koa-router -s , server.js 修改

```
  //引用
  const Router = require("koa-router");
  //实例化
   const router = new Router();
   //注册到koa
   server.use(router.routes());
```

2. 创建 /a/:id 标签

```
   router.get("/a/:id", async ctx => {
        const id = ctx.params.id;
        await handle(ctx.req, ctx.res, {
        pathname: "/a",
        query: {
            id
        }
        });
        ctx.respond = false;
    });
```

3. 在 pages/下创建 a.js 页面接受跳转

### redis 安装 + 使用

1. mac 通过 brew 进行安装

```

brew update //更新brew 源
brew install redis  //安装redis
redis-server //打开redis

redis-cli //终端 连接数据
KEYS * //查看key
set a 123 //设置key为a vlue值为123
get a //出去"123"

```

2. redis 特点:

- 默认端口:6379
- 内存存储
- 支持 可持久存储
- 支持多种数据结构 hashmap , map ,键值对
