import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader/AppHeader";

export default function Root() {
  return (
    <Layout>
      <AppHeader />
      <Content
        style={{
          padding: "1% 5%", // keep it 1% please
          backgroundColor: "#fdfdfd",
          minHeight: "82vh",
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
