import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader/AppHeader';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Root() {
  const location = useLocation();
  const excludedPaths = ['/login', '/signup'];
  const shouldRenderHeader = !excludedPaths.includes(location.pathname);

  return (
    <Layout>
      {shouldRenderHeader && <AppHeader />}
      <Content
        style={{
          padding: '1% 5%', // keep it 1% please
          backgroundColor: '#fdfdfd',
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
