import { Button, Flex, Menu } from "antd";
import {
    SettingFilled,
    UserAddOutlined,
    UserOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { AiOutlineHistory, AiOutlineGroup } from "react-icons/ai";
import { useLogoutMutation } from "../../app/services/auth";
import Cookies from "js-cookie";

const AppHeader = () => {
    const navigate = useNavigate();
    const [logoutTrigger] = useLogoutMutation();

    const HeaderItems = [
        {
            url: "user-files-history",
            title: "User Files History",
            icon: <HistoryOutlined />,
        },
        {
            url: "",
            title: "Groups",
            icon: <AiOutlineGroup />,
        },
    ];
    const [selectedItem, setSelectedItem] = useState("Login");
    return (
        <div>
            <Header
                style={{
                    alignItems: "center",
                    backgroundColor: "#5c0011",
                }}
            >
                <Flex justify="space-between" align="center">
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
                                icon: item.icon ?? false,
                                key: item.url,
                                label: item.title,
                                className: "menu-item",
                                style: {
                                    backgroundColor:
                                        selectedItem === item.url
                                            ? "rgb(151, 0, 0)"
                                            : "transparent",
                                    transition: "background-color 0.3s",
                                },
                            };
                        })}
                    />

                    <Button
                        onClick={() => {
                            logoutTrigger();
                            Cookies.remove("refreshToken");
                            Cookies.remove("accessToken");
                            navigate("login");
                        }}
                        type="text"
                        style={{ color: "whitesmoke" }}
                    >
                        logout
                    </Button>
                </Flex>
            </Header>
        </div>
    );
};

export default AppHeader;
