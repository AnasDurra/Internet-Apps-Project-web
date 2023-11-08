import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd';
import { RiDownloadCloud2Fill, RiFoldersFill } from 'react-icons/ri';
import { MdManageAccounts, MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlineFile } from 'react-icons/ai';
import { BsFileEarmarkLockFill } from 'react-icons/bs';

import { IoMdAdd } from 'react-icons/io';

import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import EditAccessModal from './edit-access-modal';
import NewGroupModal from './new-group-modal';
import NewFileModal from './new-file-modal';

export default function ViewGroup() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditAccessModalOpen, setIsEditAccessModalOpen] = useState(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    columnWidth: '5%',
    // hideSelectAll: true,
    onChange: onSelectChange,
    getCheckboxProps: (record) => {
      console.log(record);
      return {
        disabled: record.name == 'Public',
      };
    },
  };

  const columns = [
    {
      title: <Title level={3}> Currently Checked In (others)</Title>,
      children: [
        {
          dataIndex: 'name',
          key: 'name',
          width: '40%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <BsFileEarmarkLockFill
                    color='#003eb3'
                    size={'3em'}
                  />
                </Col>
                <Col style={{ marginBlock: 'auto' }}>
                  <Typography.Text>{text}</Typography.Text>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          width: '20%',
          render: (text) => text,
        },

        {
          title: 'Last Updated',
          dataIndex: 'lastUpdated',
          key: 'lastUpdated',
          width: '20%',

          render: (text) => text,
        },
        {
          title: 'checked-in-by',
          dataIndex: 'owner',
          key: 'owner',
          width: '20%',
          render: (text) => text,
        },
      ],
    },
  ];
  const columns2 = [
    {
      title: <Title level={3}> Free To Use</Title>,
      children: [
        {
          dataIndex: 'name',
          key: 'name',
          width: '40%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <AiOutlineFile
                    color='#003eb3'
                    size={'3em'}
                  />
                </Col>
                <Col style={{ marginBlock: 'auto' }}>
                  <Typography.Text>{text}</Typography.Text>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          width: '20%',
          render: (text) => text,
        },

        {
          title: 'Last Updated',
          dataIndex: 'lastUpdated',
          key: 'lastUpdated',
          width: '20%',

          render: (text) => text,
        },
        {
          key: 'action',
          width: '20%',
          render: (_, record) => {
            return !selectedRowKeys?.length && record.text != 'Public' ? (
              <Row
                gutter={16}
                justify={'space-evenly'}
              >
                <Col>
                  <a
                    onClick={() => {
                      setIsEditAccessModalOpen(true);
                    }}
                  >
                    <MdManageAccounts
                      size={'2em'}
                      color='grey'
                    />
                  </a>
                </Col>
                <Col>
                  <a onClick={() => {}}>
                    <MdOutlineDeleteOutline
                      size={'2em'}
                      color='#ff7875'
                    />
                  </a>
                </Col>
              </Row>
            ) : (
              <></>
            );
          },
        },
      ],
    },
  ];
  const columns3 = [
    {
      title: <Title level={3}> Currently Checked In (me)</Title>,
      children: [
        {
          dataIndex: 'name',
          key: 'name',
          width: '40%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <BsFileEarmarkLockFill
                    color='#003eb3'
                    size={'3em'}
                  />
                </Col>
                <Col style={{ marginBlock: 'auto' }}>
                  <Typography.Text>{text}</Typography.Text>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          width: '20%',
          render: (text) => text,
        },

        {
          title: 'Last Updated',
          dataIndex: 'lastUpdated',
          key: 'lastUpdated',
          width: '20%',

          render: (text) => text,
        },
        {
          key: 'action',
          width: '20%',
          render: (_, record) => {
            return !selectedRowKeys?.length && record.text != 'Public' ? (
              <Row
                gutter={16}
                justify={'space-evenly'}
              >
                <Col>
                  <a
                    onClick={() => {
                      setIsEditAccessModalOpen(true);
                    }}
                  >
                    <MdManageAccounts
                      size={'2em'}
                      color='grey'
                    />
                  </a>
                </Col>
                <Col>
                  <a onClick={() => {}}>
                    <MdOutlineDeleteOutline
                      size={'2em'}
                      color='#ff7875'
                    />
                  </a>
                </Col>
              </Row>
            ) : (
              <></>
            );
          },
        },
      ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '5',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '6',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '8',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '9',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <Col>
          <Button
            type='primary'
            icon={<IoMdAdd />}
            size={'large'}
            onClick={() => {
              setIsNewFileModalOpen(true);
            }}
          >
            New File
          </Button>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Table
            pagination={{ pageSize: 8 }}
            style={{ width: '100%' }}
            columns={columns2}
            dataSource={data}
            //bordered
            size='small'
            rowSelection={rowSelection}
          />
        </Col>
        <Col span={12}>
          <Row>
            <Table
              pagination={{ pageSize: 3 }}
              style={{ width: '100%' }}
              columns={columns}
              dataSource={data}
              //bordered
              size='small'
              rowSelection={rowSelection}
            />
          </Row>
          <Row>
            <Table
              pagination={{ pageSize: 3 }}
              style={{ width: '100%' }}
              columns={columns3}
              dataSource={data}
              //bordered
              size='small'
              rowSelection={rowSelection}
            />
          </Row>
        </Col>
      </Row>

      <EditAccessModal
        isOpen={isEditAccessModalOpen}
        setOpen={setIsEditAccessModalOpen}
      />

      <NewFileModal
        isOpen={isNewFileModalOpen}
        setOpen={setIsNewFileModalOpen}
      />
    </div>
  );
}
