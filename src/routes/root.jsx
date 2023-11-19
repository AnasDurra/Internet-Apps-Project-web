import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#5c0011',
        }}
      />

      <Content
        style={{
          padding: '1% 5%',
          minHeight: '82vh',
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Internet Apps Project (23-24)
      </Footer>
    </Layout>
  );
}
