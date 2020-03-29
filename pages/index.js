import axios from "axios";
import { useEffect } from "react";
const api = require("../lib/api");

function Index() {
  return <span>Index</span>;
}

Index.getInitialProps = async ({ ctx }) => {
  const result = await api.request({
    url: "/search/repositories?q=react"
  });
};

export default withRouter(Index);
