import { Menu } from "antd";
import {
  SettingFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();
  const HeaderItems = [{ url: "configurations", title: "Configurations" }];
  const [selectedItem, setSelectedItem] = useState("Login");
  return (
    <div>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#5c0011",
        }}
      >
        <Menu
          mode="horizontal"
          style={{
            width: "100%",
            backgroundColor: "#5c0011",
          }}
          selectedKeys={[selectedItem]}
          onSelect={(info) => {
            setSelectedItem(info.key);
            navigate(`/${info.key}`);
          }}
          items={HeaderItems.map((item) => {
            return {
              icon: item.url === "configurations" ? <SettingFilled /> : false,
              key: item.url,
              label: item.title,
              className: "menu-item",
              style: {
                backgroundColor:
                  selectedItem === item.url ? "rgb(151, 0, 0)" : "transparent",
                transition: "background-color 0.3s",
              },
            };
          })}
        />
      </Header>
    </div>
  );
};

export default AppHeader;
