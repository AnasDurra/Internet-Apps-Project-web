import { UserOutlined } from '@ant-design/icons';
import { Divider, Modal, Table, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineHistory, AiTwotoneLock } from 'react-icons/ai';
import { BsFillUnlockFill } from 'react-icons/bs';

import { useLazyGetFileHistoryQuery } from '../../app/services/history';

const ViewFileHistoryModal = ({
  isHistoryModalOpen,
  setIsHistoryModalOpen,
  file_id,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [getFileHistory, { isLoading, isFetching, data }] =
    useLazyGetFileHistoryQuery();

  const wrong = (message = 'Something went wrong!') => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  useEffect(() => {
    if (file_id) {
      getFileHistory({ file_id: file_id });
    }
  }, [file_id]);

  const columns = [
    {
      key: '1',
      title: 'User Full Name',
      dataIndex: ['user', 'full_name'],
    },
    {
      key: '2',
      title: 'User username',
      dataIndex: ['user', 'username'],
      render: (text) => {
        return (
          <div>
            <UserOutlined style={{ marginRight: '0.5em' }} />
            <Typography.Text>{text}</Typography.Text>
          </div>
        );
      },
    },
    {
      key: '3',
      title: 'Status Type',
      dataIndex: 'status_id',
      render: (id) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2em',
              padding: '0 0.5em',
              backgroundColor: '#f5f5f5',
              width: '50%',
              height: '1.8em',
            }}
          >
            {id == 1 && (
              <>
                <span style={{ marginRight: '0.5em' }}>check-in</span>
                <AiTwotoneLock
                  size={'1.5em'}
                  color='grey'
                />
              </>
            )}

            {id == 2 && (
              <>
                <span style={{ marginRight: '0.5em' }}>check-out</span>
                <BsFillUnlockFill
                  size={'1.5em'}
                  color='grey'
                />
              </>
            )}
          </div>
        );
      },
    },
    {
      title: 'Date/Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt, record) => {
        return record.status_id === 1
          ? new Date(createdAt).toLocaleString()
          : new Date(createdAt).toLocaleString();
      },
    },
  ];

  return (
    <Modal
      title={
        <div style={{ display: 'flex' }}>
          <AiOutlineHistory
            size={40}
            style={{
              margin: '5px 10px 0px 0px',
              padding: '2px',
              borderRadius: '20px',
              color: '#1890ff',
            }}
          />
          <Typography.Title
            level={2}
            style={{
              marginTop: '10px',
            }}
          >
            File History
          </Typography.Title>
        </div>
      }
      width={'70%'}
      onCancel={() => setIsHistoryModalOpen(false)}
      centered
      footer={null}
      open={isHistoryModalOpen}
    >
      <Divider style={{ marginTop: 0 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1em',
        }}
      >
        {contextHolder}

        <Table
          style={{
            width: '100%',
            border: '1px solid #ddd',
            backgroundColor: '#fdfdfd',
            // margin: "5px",
          }}
          loading={isLoading || isFetching}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          columns={columns}
          dataSource={data}
          // size="small"
        />
      </div>
    </Modal>
  );
};

export default ViewFileHistoryModal;
