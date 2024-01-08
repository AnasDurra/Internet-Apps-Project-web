import {
    AiFillFile,
    AiFillFolderOpen,
    AiFillHome,
    AiOutlineSearch,
    AiTwotoneLock,
} from "react-icons/ai";

import {
    Breadcrumb,
    Divider,
    Row,
    Select,
    Space,
    Table,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { BsFillUnlockFill } from "react-icons/bs";

import { useLazyGetUserFilesHistoryQuery } from "../../../app/services/history";
import { useGetUsersQuery } from "../../../app/services/users";
import { UserOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const UserFilesHistory = () => {
    const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
    const [data, setData] = useState([]);
    const [
        getUserFilesHistory,
        { isLoading: isLoadingUserHistory, isFetching: isFetchingUserHistory },
    ] = useLazyGetUserFilesHistoryQuery();
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const jwtToken = Cookies.get("accessToken");

        try {
            const decoded = jwtDecode(jwtToken);
            setDecodedToken(decoded);
        } catch (error) {
            console.error("Error decoding JWT token:", error.message);
        }
    }, []);

    const columns = [
        {
            key: "1",
            title: "File name",
            dataIndex: ["file", "name"],
            render: (text) => {
                return (
                    <div>
                        <AiFillFile
                            style={{ color: "black", marginRight: "0.4em" }}
                        />

                        <span>{text}</span>
                    </div>
                );
            },
        },
        {
            key: "2",
            title: "File path",
            dataIndex: ["file", "folder", "name"],
            width: "30%",
            render: (text, record) => {
                return (
                    <div>
                        <Breadcrumb
                            items={[
                                {
                                    title: (
                                        <AiFillHome
                                            style={{ marginRight: "0.3em" }}
                                        />
                                    ),
                                },
                                {
                                    title: (
                                        <>
                                            <AiFillFolderOpen
                                                style={{
                                                    color: "gray",
                                                    marginRight: "0.4em",
                                                }}
                                            />
                                            <span>{text}</span>
                                        </>
                                    ),
                                },
                                {
                                    title: (
                                        <>
                                            <AiFillFile
                                                style={{
                                                    color: "gray",
                                                    marginRight: "0.4em",
                                                }}
                                            />

                                            <span>{record.file.name}</span>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                );
            },
        },
        {
            key: "3",
            title: "Status Type",
            dataIndex: ["status", "id"],
            render: (id) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "2em",
                            padding: "0 0.5em",
                            backgroundColor: "#f5f5f5",
                            width: "50%",
                            height: "1.8em",
                        }}
                    >
                        {id == 1 && (
                            <>
                                <span style={{ marginRight: "0.5em" }}>
                                    check-in
                                </span>
                                <AiTwotoneLock size={"1.5em"} color="grey" />
                            </>
                        )}

                        {id == 2 && (
                            <>
                                <span style={{ marginRight: "0.5em" }}>
                                    check-out
                                </span>
                                <BsFillUnlockFill size={"1.5em"} color="grey" />
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Date/Time",
            dataIndex: "created_at",
            key: "created_at",
            render: (createdAt, record) => {
                return record.status_id === 1
                    ? new Date(createdAt).toLocaleString()
                    : new Date(createdAt).toLocaleString();
            },
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            defaultSortOrder: "desc",
            // sortDirections: ["asc", "desc"],
        },
    ];
    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const handleOnSelect = (input, option) => {
        // console.log(option);
        getUserFilesHistory(option.id)
            .unwrap()
            .then((result) => {
                // console.log(result);
                setData(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div style={{}}>
            <Space size={24} style={{ width: "100%" }} direction="vertical">
                <Space>
                    <AiOutlineSearch
                        style={{
                            fontSize: "60px",
                            marginRight: "0.3em",
                            backgroundColor: "#b3cde0",
                            borderRadius: "40px",
                            padding: "5px ",
                        }}
                    />
                    <Typography.Title level={3}>
                        User Files History
                    </Typography.Title>
                </Space>
                <Divider style={{ margin: "0px" }} />
                <Space style={{ marginTop: "2em", width: "100%" }}>
                    <Row>
                        <UserOutlined
                            style={{ fontSize: "18px", marginRight: "0.5em" }}
                        />
                        <Typography.Title style={{ margin: 0 }} level={5}>
                            Select user :
                        </Typography.Title>
                    </Row>
                    <Row>
                        <Select
                            style={{ width: "20vw" }}
                            showSearch
                            placeholder="Select a user"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            autoFocus
                            loading={
                                isLoadingUserHistory ||
                                isFetchingUserHistory ||
                                isLoadingUsers
                            }
                            disabled={
                                isLoadingUserHistory || isFetchingUserHistory
                            }
                            onChange={handleOnSelect}
                            options={users
                                .filter(
                                    (user) =>
                                        user.id == decodedToken?.sub ||
                                        decodedToken?.sub == 1
                                )
                                .map((user) => {
                                    return {
                                        id: user.id,
                                        value: user.id,
                                        label: "@" + user.username,
                                    };
                                })}
                        />
                    </Row>
                </Space>

                <Table
                    style={{
                        width: "100%",
                        // border: "1px solid #ddd",
                        backgroundColor: "#fdfdfd",
                    }}
                    loading={isLoadingUserHistory || isFetchingUserHistory}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    columns={columns}
                    dataSource={data}
                />
            </Space>
        </div>
    );
};

export default UserFilesHistory;
