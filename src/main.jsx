import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import GroupsPage from "./routes/groups/groups-page.jsx";
import { ConfigProvider } from "antd";
import ViewGroup from "./routes/groups/one-group-page.jsx";
import LoginPage from "./routes/groups/RegisterationPages/LoginPage.jsx";
import UserRegister from "./routes/groups/RegisterationPages/UserRegister.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "groups",
        element: <GroupsPage />,
      },
      {
        path: "groups/:group_name",
        element: <ViewGroup />,
      },
      {
        path: "groups/:group_name",
        element: <ViewGroup />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <UserRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: "#610b00",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
