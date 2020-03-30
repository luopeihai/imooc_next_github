import axios from "axios";
import { useEffect } from "react";
import Router, { withRouter } from "next/router";
const api = require("../lib/api");

function Index({ isLogin, userRepos, userStaredRepos }) {
  console.log(userRepos, userStaredRepos);
  return <span>Index</span>;
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false
    };
  }
  const userRepos = await api.request(
    {
      url: "/user/repos"
    },
    ctx.req,
    ctx.res
  );

  const userStaredRepos = await api.request(
    {
      url: "/user/starred"
    },
    ctx.req,
    ctx.res
  );

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data
  };
};

export default withRouter(Index);
