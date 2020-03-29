// 处理github返回的auth code 中间件
const axios = require("axios");
const config = require("../config");

const { client_id, client_secret, request_token_url } = config.github;

module.exports = server => {
  server.use(async (ctx, next) => {
    //github 登录成功的回调
    if (ctx.path === "/auth") {
      const { code } = ctx.query;
      if (code) {
        // 获取Oauth鉴权信息
        const result = await axios({
          method: "POST",
          url: request_token_url,
          data: {
            client_id,
            client_secret,
            code
          },
          headers: {
            Accept: "application/json"
          }
        });

        // github 可能会在status是200的情况下返回error信息
        if (result.status === 200 && result.data && !result.data.error) {
          ctx.session.githubAuth = result.data;

          const { access_token, token_type } = result.data;
          // 获取用户信息
          const { data: userInfo } = await axios({
            method: "GET",
            url: "https://api.github.com/user",
            headers: {
              Authorization: `${token_type} ${access_token}`
            }
          });

          ctx.session.userInfo = userInfo;
          // 重定向到登录前的页面或首页
          ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || "/");
          ctx.session.urlBeforeOAuth = "";
        } else {
          ctx.body = `request token failed ${result.data && result.data.error}`;
        }
      } else {
        ctx.body = "code not exist";
      }
    } else {
      await next();
    }
  });

  //登出 后台 session 删除
  server.use(async (ctx, next) => {
    const path = ctx.path;
    const method = ctx.method;
    if (path === "/logout" && method === "POST") {
      ctx.session = null;
      ctx.body = `退出登录`;
    } else {
      await next();
    }
  });

  // 在进行auth之前 记录请求时的页面url
  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    if (path === "/prepare-auth" && method === "GET") {
      const { url } = ctx.query;
      ctx.session.urlBeforeOAuth = url;
      //跳转github授权页
      ctx.redirect(config.OAUTH_URL);
    } else {
      await next();
    }
  });
};
