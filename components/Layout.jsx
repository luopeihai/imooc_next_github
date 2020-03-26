import Link from "next/link";
import { Button } from "antd";

export default ({ children }) => (
  <header>
    <Link href="/a">
      <Button>跳转到a页面</Button>
    </Link>
    <section className="container">{children}</section>
  </header>
);
