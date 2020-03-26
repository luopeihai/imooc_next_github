import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";

const Home = () => {
  function goAHome() {
    Router.push(
      {
        pathname: "/a",
        query: {
          id: 2
        }
      },
      "/b/b"
    );
  }

  return (
    <>
      <Link href="/a" className="container">
        <Button>哈哈哈</Button>
      </Link>
      <Button onClick={goAHome}>函数跳转</Button>
    </>
  );
};

export default Home;
