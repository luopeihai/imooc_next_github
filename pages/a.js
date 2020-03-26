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
