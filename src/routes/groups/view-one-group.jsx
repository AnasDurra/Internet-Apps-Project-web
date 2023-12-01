import {
  Button,
  Col,
  Popconfirm,
  Row,
  Spin,
  Table,
  Typography,
  message,
  theme,
} from 'antd';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlineFile, AiTwotoneLock } from 'react-icons/ai';
import { BsFileEarmarkLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import NewFileModal from './modal-new-file';
import LargeMultiSelectButtons from './large-multi-select-buttons';
import { LuFileEdit } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import {
  useCheckInFilesMutation,
  useCheckOutFileMutation,
  useDeleteFileMutation,
  useGetFilesInFolderQuery,
} from '../../app/services/files';
import moment from 'moment';
import { getLoggedInUser } from '../../app/services/auth';
import { successMessage } from '../../components/messages.api';
import EditFileModal from './modal-edit-file';

const { useToken } = theme;

export default function ViewOneGroup() {
  const { group_id } = useParams();

  const [freeToUseSelectedRowKeys, setFreeToUseSelectedRowKeys] = useState([]);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const { data: files, isLoading: isFilesLoading } =
    useGetFilesInFolderQuery(group_id);
  const [checkInFiles, { isLoading: isCheckInFileLoading }] =
    useCheckInFilesMutation();
  const [checkOutFile, { isLoading: isCheckOutFileLoading }] =
    useCheckOutFileMutation();
  const [deleteFile] = useDeleteFileMutation();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isCheckInFileLoading) {
      messageApi.open({
        type: 'loading',
        content: 'checking In..',
        duration: 0,
      });
    } else messageApi.destroy();
  }, [isCheckInFileLoading]);

  useEffect(() => {
    if (isCheckOutFileLoading) {
      messageApi.open({
        type: 'loading',
        content: 'checking Out..',
      });
    } else messageApi.destroy();
  }, [isCheckOutFileLoading]);

  const freeToUseRowSelection = {
    selectedRowKeys: freeToUseSelectedRowKeys,
    columnWidth: '5%',
    onChange: (newSelectedRowKeys) => {
      setFreeToUseSelectedRowKeys(newSelectedRowKeys);
    },

    getCheckboxProps: (record) => {
      return {
        disabled: record.name == 'Public',
      };
    },
  };

  const othersCheckedInColumns = [
    {
      title: <span> Currently Checked In (others)</span>,
      children: [
        {
          width: '5%',
        },
        {
          title: <span style={{ marginLeft: '15%' }}>File name</span>,
          dataIndex: 'name',
          key: 'name',
          width: '40%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <BsFileEarmarkLockFill
                    color='#003eb3'
                    size={'2em'}
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
          title: 'checked-in-by',
          dataIndex: ['owner', 'username'],
          key: 'owner',
          width: '20%',
          render: (text) => text,
        },
      ],
    },
  ];
  const freeToUseColumns = [
    {
      title: <span> Free To Use</span>,
      children: [
        {
          title: <span style={{ marginLeft: '25%' }}>File name</span>,
          dataIndex: 'name',
          key: 'name',
          width: '25%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <AiOutlineFile
                    color='#003eb3'
                    size={'2em'}
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
          dataIndex: ['owner', 'username'],
          key: 'owner',
          width: '15%',
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
          width: '30%',
          render: (_, record) => {
            return !freeToUseSelectedRowKeys?.length &&
              record.text != 'Public' ? (
              <Row justify={'space-evenly'}>
                <Col>
                  <a
                    onClick={() => {
                      checkInFiles([record.id])
                        .unwrap()
                        .then(() => {
                          setFreeToUseSelectedRowKeys([]);

                          successMessage({
                            content: 'File Checked In Successfully',
                          });
                        });
                    }}
                    style={{ color: 'black' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '2em',
                        padding: '0 0.5em',
                        backgroundColor: '#f5f5f5',
                        width: '100%',
                        height: '1.8em',
                      }}
                    >
                      <p style={{ marginRight: '0.5em' }}>check-in </p>

                      <AiTwotoneLock
                        size={'1.5em'}
                        color='grey'
                      />
                    </div>
                  </a>
                </Col>

                {/* <Col>
                  <a onClick={() => {}}>
                    <LuFileEdit
                      size={'1.5em'}
                      color='grey'
                    />
                  </a>
                </Col> */}
                <Col>
                  <Popconfirm
                    title='Delete the file'
                    description='Are you sure to delete this file?'
                    onConfirm={(event) => {
                      deleteFile(record.id)
                        .unwrap()
                        .then(() => {
                          successMessage({ content: 'File Deleted' });
                        });
                      event.stopPropagation();
                    }}
                    okText='Yes'
                    cancelText='No'
                  >
                    <a>
                      <MdOutlineDeleteOutline
                        size={'1.5em'}
                        color='#ff7875'
                      />
                    </a>
                  </Popconfirm>
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
  const myCheckedInColumns = [
    {
      title: <span> Currently Checked In (me)</span>,
      children: [
        {
          title: <span style={{ marginLeft: '20%' }}>File name</span>,
          dataIndex: 'name',
          key: 'name',
          width: '25%',

          render: (text) => (
            <div>
              <Row gutter={16}>
                <Col>
                  <BsFileEarmarkLockFill
                    color='#003eb3'
                    size={'2em'}
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
          dataIndex: ['owner', 'username'],
          key: 'owner',
          width: '15%',
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
          width: '30%',
          render: (_, record) => {
            return (
              <Row
                gutter={8}
                justify={'space-evenly'}
              >
                <Col>
                  <a
                    onClick={() => {
                      checkOutFile(record.id)
                        .unwrap()
                        .then(() => {
                          successMessage({
                            content: 'File Checked out Successfully',
                          });
                        });
                    }}
                    style={{ color: 'black' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '2em',
                        padding: '0 0.5em',
                        backgroundColor: '#f5f5f5',
                        width: '100%',
                        height: '1.8em',
                      }}
                    >
                      <p style={{ marginRight: '0.5em' }}>check-out </p>

                      <BsFillUnlockFill
                        size={'1.2em'}
                        color='grey'
                      />
                    </div>
                  </a>
                </Col>

                <Col>
                  <a
                    onClick={() => {
                      setSelectedFile(record);
                      console.log('record', record);
                      setIsEditFileModalOpen(true);
                    }}
                  >
                    <LuFileEdit
                      size={'1.5em'}
                      color='grey'
                    />
                  </a>
                </Col>
                <Col>
                  <Popconfirm
                    title='Delete the file'
                    description='Are you sure to delete this file?'
                    onConfirm={(event) => {
                      deleteFile(record.id)
                        .unwrap()
                        .then(() => {
                          successMessage({ content: 'File Deleted' });
                        });
                      event.stopPropagation();
                    }}
                    okText='Yes'
                    cancelText='No'
                  >
                    <a>
                      <MdOutlineDeleteOutline
                        size={'1.5em'}
                        color='#ff7875'
                      />
                    </a>
                  </Popconfirm>
                </Col>
              </Row>
            );
          },
        },
      ],
    },
  ];
  return (
    <>
      {freeToUseSelectedRowKeys?.length == 0 && (
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
      )}

      <Row
        gutter={24}
        style={{ height: '100%' }}
      >
        <Col span={12}>
          <Table
            pagination={{ pageSize: 10, position: ['bottomLeft'] }}
            style={{ width: '100%' }}
            columns={freeToUseColumns}
            dataSource={files
              ?.filter((file) => file.FilesStatus[0]?.status_id == 2)
              .map((file) => ({ ...file, key: file.id }))}
            size='small'
            rowSelection={freeToUseRowSelection}
          />
        </Col>

        <Col span={12}>
          {freeToUseSelectedRowKeys?.length == 0 ? (
            <>
              <Row>
                <Table
                  pagination={{
                    pageSize: 3,
                  }}
                  style={{ width: '100%' }}
                  columns={myCheckedInColumns}
                  dataSource={files
                    ?.filter(
                      (file) =>
                        file.FilesStatus[0]?.status_id == 1 &&
                        file.FilesStatus[0]?.user?.username ==
                          getLoggedInUser().username
                    )
                    .map((file) => ({ ...file, key: file.id }))}
                  size='small'
                />
              </Row>

              <Row style={{ marginTop: '0em' }}>
                <Table
                  pagination={{ pageSize: 3 }}
                  style={{ width: '100%' }}
                  columns={othersCheckedInColumns}
                  dataSource={files
                    ?.filter(
                      (file) =>
                        file.FilesStatus[0]?.status_id == 1 &&
                        file.FilesStatus[0]?.user?.username !=
                          getLoggedInUser().username
                    )
                    .map((file) => ({ ...file, key: file.id }))}
                  size='small'
                />
              </Row>
            </>
          ) : (
            <LargeMultiSelectButtons
              onCheckInClick={() => {
                console.log(freeToUseSelectedRowKeys);
                checkInFiles(freeToUseSelectedRowKeys)
                  .unwrap()
                  .then(() => {
                    setFreeToUseSelectedRowKeys([]);

                    successMessage({
                      content: 'Files Checked In Successfully',
                    });
                  });
              }}
              onDeleteClick={() => {}}
            />
          )}
        </Col>
      </Row>

      <NewFileModal
        isOpen={isNewFileModalOpen}
        setOpen={setIsNewFileModalOpen}
      />
      
      <EditFileModal
        isOpen={isEditFileModalOpen}
        setOpen={setIsEditFileModalOpen}
        file={selectedFile}
      />

      <Spin
        spinning={isFilesLoading}
        fullscreen
      />

      {contextHolder}
    </>
  );
}
