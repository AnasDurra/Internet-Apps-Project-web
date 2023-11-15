import { Layout } from "antd";

import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AppHeader from "./groups/AppHeader/AppHeader";

export default function Root() {
  return (
    <Layout>
      <AppHeader />
      <Content
        style={{
          padding: "2% 5%",
          backgroundColor: "#fdfdfd",
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Internet Apps Project (23-24)
      </Footer>
    </Layout>
  );
}
