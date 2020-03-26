import { withRouter } from "next/router";
import styled from "styled-components";
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

const A = ({ router, name }) => (
  <>
    <span className="link">
      <Title>
        A name:{name} {router.query.id}
      </Title>
    </span>
  </>
);

A.getInitialProps = () => {
  return {
    name: "jokcy"
  };
};

export default withRouter(A);
