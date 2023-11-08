import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor:'#5c0011'
        }}
      />

      <Content
        style={{
          padding: '2% 5%',
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
