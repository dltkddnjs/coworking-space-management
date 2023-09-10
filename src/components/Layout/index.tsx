import { Layout, Menu } from 'antd';

import type { AppProps, MenuProps } from 'antd';
import { usePagination } from 'context/PaginationProvider';

import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

const headerItem: MenuProps['items'] = [
  {
    key: 'header',
  },
];

const sideMenuItems: MenuProps['items'] = [
  { key: '/branch', label: '오피스' },
  { key: '/unit/1', label: '룸' },
];

const PageLayout: React.FC<AppProps> = ({ children }) => {
  const { changeCurrentPage } = usePagination();
  const router = useRouter();

  return (
    <Layout
      style={{
        width: '100%',
        height: '100%',
        minWidth: '1200px',
        minHeight: '800px',
      }}
    >
      <Header style={{ height: '60px' }}>
        <Menu theme="dark" mode="horizontal" items={headerItem} />
      </Header>
      <Layout
        hasSider={true}
        style={{
          width: '100%',
          height: `calc(100 % - 60px)`,
          display: 'flex',
        }}
      >
        <Sider
          width={250}
          style={{
            background: 'white',
          }}
        >
          <Menu
            items={sideMenuItems}
            style={{ padding: '15px' }}
            onClick={({ key }) => {
              router.push(key);
              changeCurrentPage(1);
            }}
            selectedKeys={[
              router.asPath === '/' || router.asPath === '/branch'
                ? '/branch'
                : '/unit/1',
            ]}
          />
        </Sider>
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'fit-content',
            minHeight: `calc(100vh - 60px)`,
            gap: '20px',
            padding: '30px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
