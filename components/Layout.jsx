import { useState, useCallback } from "react";
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
import Container from "./Container";

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};

const footerStyle = {
  textAlign: "center"
};

const Comp = ({ color, childern }) => <div style={{ color }}>{childern}</div>;

export default ({ children }) => {
  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback(event => {
    setSearch(event.target.value);
  }, []);
  const handleOnSearch = useCallback(() => {}, []);

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </Container>
      </Header>

      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>Develop by Jokcy teacher</Footer>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }

          .ant-layout {
            min-height: 100%;
          }

          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
          }

          .ant-layout-content {
            background: #fff;
          }
        `}
      </style>
      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }

          .header-left {
            display: flex;
            justify-content: flex-start;
          }

          :global(.icon-github) {
            display: block;
            padding-top: 10px;
            margin-right: 20px;
            color: #fff;
            font-size: 40px;
          }

          :global(.footer) {
            text-align: center;
          }
        `}
      </style>
    </Layout>
  );
};
