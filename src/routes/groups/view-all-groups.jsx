import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd';
import { RiDownloadCloud2Fill, RiFoldersFill } from 'react-icons/ri';
import { MdManageAccounts, MdOutlineDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import EditAccessModal from './modal-edit-group';
import NewGroupModal from './modal-new-group';
import { useNavigate } from 'react-router-dom';
import '/src/routes/groups/zstyle.css';
import { useGetFoldersQuery } from '../../app/services/folders';
import { LuFolderCog } from 'react-icons/lu';

export default function ViewAllGroups() {
  const { data: folders, isLoading, isError } = useGetFoldersQuery();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditAccessModalOpen, setIsEditAccessModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    columnWidth: '5%',
    onChange: onSelectChange,
    getCheckboxProps: (record) => {
      return {
        disabled: record.name == 'Public',
      };
    },
  };

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      render: (text) => (
        <div>
          <Row gutter={16}>
            <Col>
              <RiFoldersFill
                color='#fadb14'
                size={'3em'}
              ></RiFoldersFill>
            </Col>
            <Col>
              <Row>
                <Typography.Text>{text}</Typography.Text>
              </Row>
              <Row>
                <Typography.Text type='secondary'>(12 Files)</Typography.Text>
              </Row>
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
          <Row gutter={16}>
            <Col offset={8}>
              <a
                onClick={(event) => {
                  event.stopPropagation();
                  setIsEditAccessModalOpen(true);
                }}
              >
                <LuFolderCog
                  size={'1.5em'}
                  color='grey'
                />
              </a>
            </Col>
            <Col>
              <a
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <MdOutlineDeleteOutline
                  size={'1.5em'}
                  color='#ff7875'
                />
              </a>
            </Col>
          </Row>
        ) : null;
      },
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
              setIsNewGroupModalOpen(true);
            }}
          >
            New Group
          </Button>
        </Col>
      </Row>

      <Row>
        <Table
          rowClassName={() => 'row'}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(`${record.name}`);
              },
            };
          }}
        />
      </Row>

      <EditAccessModal
        isOpen={isEditAccessModalOpen}
        setOpen={setIsEditAccessModalOpen}
      />

      <NewGroupModal
        isOpen={isNewGroupModalOpen}
        setOpen={setIsNewGroupModalOpen}
      />
    </div>
  );
}
