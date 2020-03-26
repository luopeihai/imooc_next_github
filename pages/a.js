import { withRouter } from "next/router";

const A = ({ router }) => (
  <>
    <span className="link"> A {router.query.id}</span>
  </>
);

export default withRouter(A);
