const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const config = require("./config");
const webpack = require("webpack");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
// withCss得到的是一个nextjs的config配置
module.exports = withBundleAnalyzer(
  withCss({
    webpack(webpackConfig) {
      webpackConfig.plugins.push(
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) //忽略掉
      );
      return webpackConfig;
    },
    publicRuntimeConfig: {
      GITHUB_OAUTH_URL,
      OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`
    },
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    }
  })
);
