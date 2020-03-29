import axios from "axios";
const api = require("../lib/api");

function Index() {
  return <span>Index</span>;
}

Index.getInitialProps = async ({ ctx }) => {
  const result = await api.request();
};

export default withRouter(Index);
