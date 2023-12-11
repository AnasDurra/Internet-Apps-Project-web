import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import ViewAllGroups from './routes/groups/view-all-groups.jsx';
import { ConfigProvider } from 'antd';
import ViewOneGroup from './routes/groups/view-one-group.jsx';
import store from './app/store.js';
import { Provider } from 'react-redux';
import DummyPage from './dummy.jsx';
import LoginPage from './routes/RegisterationPages/LoginPage.jsx';
import UserRegister from './routes/RegisterationPages/UserRegister.jsx';
import UserFilesHistory from './routes/AppHeader/Pages/UserFilesHistory.jsx';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ViewAllGroups />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <UserRegister />,
      },
      {
        path: ':group_id',
        element: <ViewOneGroup />,
      },
      {
        path: 'user-files-history',
        element: <UserFilesHistory />,
      },
      {
        path: 'test',
        element: <DummyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          //  fontSize: 12,
          colorPrimary: '#610b00',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);
