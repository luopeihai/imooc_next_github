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

### 文件说明

- pages 每个.js 对应一个页面
- components 组件
- lib 类库代码
- static 资源文件
- .next 编译文件
- next.config.js next 配置文件

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

### node 连接 redis

1. 安装 redis 插件库 ioredis : npm i ioredis -s
2. 创建 test-redis.js 对 redis 数据操作

```
    const Redis = require("ioredis");

    const redis = new Redis();
    //异步操作
    redis.keys("*").then(keys => console.log(keys));
```

3. 执行文件 : node test-redis.js

### 项目 antd 引入

> 由于 next 默认配置不支持 css 文件引用,所以需要做一下步骤

1. 安装支持 next 使用 css 的包:npm i @zeit/next-css -s
2. 由于 next 默认配置不支持,css 文件引用需要修改 next 配置,根目录创建 next.config.js

```
    const withCss = require('@zeit/next-css')

    if (typeof require !== 'undefined') { //require 存在
    require.extensions['.css'] = file => {}
    }

    // withCss得到的是一个nextjs的config配置
    module.exports = withCss({})
```

3. antd 库引入 : npm i antd -s , 和按需加载库:npm i babel-plugin-import -s

4. 根目录创建按需加载配置文件: .babelrc

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd"
      }
    ]
  ]
}

```

5.全局引入 antd css 文件

> next 自带默认配置文件,需要在 pages 下创建\_app.js 进行修改

```
import App, { Container } from "next/app";
import "antd/dist/antd.css"; //引入css

export default App;
```

### 路由跳转

> next Link 组件进行跳转,跳转属性 href="",注意 Link 里面只有一个子节点

### 动态路由(带参)

1. 参数跳转 a 页面

```
import Router from "next/router";
Router.push({
      pathname: "/a",
      query: {
        id: 2
      }
    });
```

2. a 页面接受参数,需要使用 withRouter

```
import { withRouter } from "next/router";

const A = ({ router }) => (
  <>
    <span className="link"> A {router.query.id}</span>
  </>
);

export default withRouter(A);
```

### 路由映射 as

> 也就是浏览器显示的跳转路劲自定义,但是真实的路劲不变

1. 修改 参数跳转

```
Router.push({
      pathname: "/a",
      query: {
        id: 2
      }
    },"/b/b");
```

这时候 请求浏览器显示为 http://localhost:3001/b/b ,真实路劲 还是带参 2 跳转到 a 页面

2. **_koa 配置路由_** : as 后的 http://localhost:3001/b/b 重新刷新页面会报错,因为访问服务器 pages 下并没有 b/b 页面,这时候需要修改 koa 重新定向跳转到 a 页面

```
 router.get("/b/:id", async ctx => {
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

### getInitialProps

> netxjs 数据获取规范:通过 getInitialProps 获取参数
> 作用:

1. 在页面中获取数据
2. 在 App 中获取全局参数
3. pages 下的.js 才能调用
   代码:

```
import { withRouter } from "next/router";

const A = ({ router, name }) => (
  <>
    <span className="link">
      A name:{name} {router.query.id}
    </span>
  </>
);

A.getInitialProps = () => {
  return {
    name: "jokcy"
  };
};

export default withRouter(A);

```

### 定义模板 Layout 页面

> 需要修改 next pages 的配置文件

1. 创建模板文件 components/Layout.jsx
2. 修改 pages/\_app.js 文件

```
import App, { Container } from "next/app";
import Layout from "../components/Layout";
import "antd/dist/antd.css";
import React from "react";

export default class MyApp extends App {
  // App组件的getInitialProps比较特殊
  // 能拿到一些额外的参数
  // Component: 被包裹的组件
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    // 拿到Component上定义的getInitialProps
    if (Component.getInitialProps) {
      // 执行拿到返回结果
      pageProps = await Component.getInitialProps(ctx);
    }

    // 返回给组件
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          {/* 把pageProps解构后传递给组件 */}
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

```

### 自定义 document + 样式

> 用来修改服务端渲染文档内容,只在服务端渲染调用

1. 创建 pages/\_document.js 文件
2. 引入 css 解决方案 需要引入 styled-components 和 babel-plugin-styled-components 库:npm i styled-components babel-plugin-styled-components -s , .babelrc 中添加代码:

```
    [
      "styled-components", {"ssr": true}
    ]
```

3. a.js 定义样式

```
import styled from "styled-components";
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

//jsx中
<Title>
        A name:{name} {router.query.id}
</Title>

```

4. \_document.js 重写 引入

### LazyLoading

> 先添加 moment 作为依赖: npm i moment -s

#### 异步加载模块

#### 异步加载组件

### Hooks

基本用法 :

```
import React, { useState, useEffect } from "react";

function MyCountFunc() {
  const [count, setCount] = useState(0); //[a,b]
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    //清楚倒计时
    return () => clearInterval(interval);
  }, []);
  return <span>{count}</span>;
}
export default MyCountFunc;
```

### state-hooks

上面已经说了一种 hooks set state 的了,下面说 reducer 的方式

```
import React, { useState,  useReducer } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

function MyCountFunc() {
  //set方式
  //   const [count, setCount] = useState(0); //[a,b]
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCount(c => c + 1);
  //     }, 1000);
  //     //清楚倒计时
  //     return () => clearInterval(interval);
  //   }, []);

  //reducer方式
  const [count, dispatchCount] = useReducer(countReducer, 0);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCount({ type: "add" });
    }, 1000);
    //清楚倒计时
    return () => clearInterval(interval);
  }, []);

  return <span>{count}</span>;
}

```

### redux

1. 安装 redux 库 : npm i redux react-redux -s
2. 引入 异步执行 中间件安装 redux-thunk 库 : npm i redx-thunk -S

### 项目中引入 redux

### redux-dev-tool 工具

1. 各大浏览器安装 redux 调试工具插件
2. 安装调试 js 库 : npm i redux-devtools-extension -s

### nextjs 中使用 HOC

### redux 嵌入 nextjs
