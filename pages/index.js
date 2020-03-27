import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";

// const Home = () => {
//   function goAHome() {
//     Router.push(
//       {
//         pathname: "/a",
//         query: {
//           id: 2
//         }
//       },
//       "/b/b"
//     );
//   }

//   return (
//     <>
//       <Link href="/a" className="container">
//         <Button>哈哈哈</Button>
//       </Link>
//       <Button onClick={goAHome}>函数跳转</Button>
//     </>
//   );
// };

const Home = ({ count, add }) => {
  return (
    <>
      <span>首页 state的count是{count}</span>
      <button onClick={add}>增加</button>
    </>
  );
};

Home.getInitialProps = async ({ reduxStore }) => {
  console.log("reduxStore: ", reduxStore);
  reduxStore.dispatch({ type: "add" });
  return {};
};

function mapStateToProps(state) {
  const { count } = state;
  return {
    count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add() {
      dispatch({ type: "add" });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
