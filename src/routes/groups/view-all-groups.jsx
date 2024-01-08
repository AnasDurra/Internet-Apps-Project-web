import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import { RiFoldersFill } from 'react-icons/ri';
import { MdManageAccounts, MdOutlineDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import EditGroupModal from './modal-edit-group';
import NewGroupModal from './modal-new-group';
import { useNavigate } from 'react-router-dom';
import '/src/routes/groups/zstyle.css';
import {
  useDeleteFolderMutation,
  useGetFoldersQuery,
} from '../../app/services/folders';
import { LuFolderCog } from 'react-icons/lu';
import moment from 'moment';
import Cookies from 'js-cookie';


export default function ViewAllGroups() {
  const {
    data: folders,
    isLoading: isFoldersLoading,
    isError,
  } = useGetFoldersQuery();
  const [deleteFolder] = useDeleteFolderMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState();

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
                size={'2em'}
              />
            </Col>
            <Col>
              <Row>
                <Typography.Text>{text}</Typography.Text>
              </Row>
              {/*  <Row>
                <Typography.Text type="secondary">(12 Files)</Typography.Text>
              </Row> */}
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'username'],
      key: 'owner',
      width: '20%',
      render: (text) => text,
    },

    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'lastUpdated',
      width: '20%',
      render: (text) => moment(text).format('YY/MM/DD (HH:mm)'),
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
                  setSelectedFolder(record);
                  setIsEditGroupModalOpen(true);
                }}
              >
                <LuFolderCog
                  size={'1.5em'}
                  color='grey'
                />
              </a>
            </Col>
            <Col>
              <Popconfirm
                title='Delete the folder'
                description='Are you sure to delete this folder?'
                onConfirm={(event) => {
                  deleteFolder(record.id);
                  event.stopPropagation();
                }}
                okText='Yes'
                cancelText='No'
              >
                <a onClick={(event) => event.stopPropagation()}>
                  <MdOutlineDeleteOutline
                    size={'1.5em'}
                    color='#ff7875'
                  />
                </a>
              </Popconfirm>
            </Col>
          </Row>
        ) : null;
      },
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
          dataSource={folders}
          // rowSelection={rowSelection}
          onRow={(record) => {
            return {
              onClick: (event) => {
                navigate(`${record.id}`);
              },
            };
          }}
        />
      </Row>

      <EditGroupModal
        isOpen={isEditGroupModalOpen}
        setOpen={setIsEditGroupModalOpen}
        folder={selectedFolder}
      />

      <NewGroupModal
        isOpen={isNewGroupModalOpen}
        setOpen={setIsNewGroupModalOpen}
      />

      <Spin
        spinning={isFoldersLoading}
        fullscreen
      />
    </div>
  );
}
