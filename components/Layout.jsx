import Link from "next/link";
import {
  Layout,
  Icon,
  Input,
  Avatar,
  Button,
  Tooltip,
  Dropdown,
  Menu
} from "antd";
const { Header, Content, Footer } = Layout;

export default ({ children }) => (
  <Layout>
    <Header></Header>
    <div className="header-left">
      <div className="logo">
        <Icon type="github" />
      </div>
      <div>
        <Input.Search placeholder="搜索仓库" />
      </div>
    </div>
    <Content>{children}</Content>
    <Footer>Develop by Jokcy teacher</Footer>
  </Layout>
);
