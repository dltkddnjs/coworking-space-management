import { Affix, Layout, Menu } from "antd";

import type { AppProps, MenuProps } from "antd";

import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

const headerItem: MenuProps["items"] = [
  {
    key: "header",
  },
];

const sideMenuItems: MenuProps["items"] = [
  { key: "/branch", label: "창고" },
  { key: "/unit/1", label: "유닛" },
];

const PageLayout: React.FC<AppProps> = ({ children }) => {
  const router = useRouter();

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" items={headerItem} />
      </Header>
      <Layout>
        <Affix>
          <Sider style={{ background: "white", height: "100vh" }}>
            <Menu
              items={sideMenuItems}
              onClick={({ key }) => router.push(key)}
              selectedKeys={[
                router.asPath === "/" || router.asPath === "/branch"
                  ? "/branch"
                  : "/unit/1",
              ]}
            />
          </Sider>
        </Affix>
        <Layout style={{ display: "flex", flexDirection: "column" }}>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "30px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
