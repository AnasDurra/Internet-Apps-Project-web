import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
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
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'groups',
        element: <ViewAllGroups />,
      },
      {
        path: 'groups/:group_name',
        element: <ViewOneGroup />,
      },
      {
        path: 'test',
        element: <DummyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
