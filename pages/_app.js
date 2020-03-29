import App, { Container } from "next/app";
import "antd/dist/antd.css";
import React from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import withRedux from "../lib/with-redux-app";
import Router from "next/router";
import PageLoading from "../components/PageLoading";
import axios from "axios";
class MyApp extends App {
  // App组件的getInitialProps比较特殊
  // 能拿到一些额外的参数
  // Component: 被包裹的组件
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};

    // 拿到Component上定义的getInitialProps
    if (Component.getInitialProps) {
      // 执行拿到返回结果`
      pageProps = await Component.getInitialProps(ctx);
    }

    // 返回给组件
    return {
      pageProps
    };
  }

  state = {
    context: "value",
    loading: false
  };

  //显示加载图标
  startLoading = () => {
    this.setState({
      loading: true
    });
  };

  //停止加载图标
  stopLoading = () => {
    this.setState({
      loading: false
    });
  };

  componentDidMount() {
    // 路由挂载事件
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoading);
    Router.events.on("routeChangeError", this.stopLoading);
  }

  componentWillUnmount() {
    //路由取消监听
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoading);
    Router.events.off("routeChangeError", this.stopLoading);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            {this.state.loading && <PageLoading />}
            <Link href="/detail">
              <a>detail页跳转</a>
            </Link>

            {/* 把pageProps解构后传递给组件 */}
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(MyApp);
