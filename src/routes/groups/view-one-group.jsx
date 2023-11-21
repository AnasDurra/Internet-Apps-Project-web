import { Button, Col, Row, Space, Table, Tag, Typography, theme } from 'antd';
import { RiDownloadCloud2Fill, RiFoldersFill } from 'react-icons/ri';
import { MdManageAccounts, MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlineFile, AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
import { BsFileEarmarkLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import EditAccessModal from './modal-edit-access';
import NewGroupModal from './modal-new-group';
import NewFileModal from './modal-new-file';

const { useToken } = theme;

export default function ViewOneGroup() {
  const [freeToUseSelectedRowKeys, setFreeToUseSelectedRowKeys] = useState([]);
  const [myCheckedInSelectedRowKeys, setMyCheckedInSelectedRowKeys] = useState(
    []
  );

  const [isEditAccessModalOpen, setIsEditAccessModalOpen] = useState(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const { token } = useToken();

  const freeToUseRowSelection = {
    freeToUseSelectedRowKeys,
    columnWidth: '5%',
    hideSelectAll: true,
    onChange: (newSelectedRowKeys) => {
      setFreeToUseSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.name == 'Public',
      };
    },
  };

  const myCheckedInRowSelection = {
    myCheckedInSelectedRowKeys,
    columnWidth: '5%',
    hideSelectAll: true,
    onChange: (newSelectedRowKeys) => {
      setMyCheckedInSelectedRowKeys(newSelectedRowKeys);
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
          dataIndex: 'owner',
          key: 'owner',
          width: '15%',
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
          width: '30%',
          render: (_, record) => {
            return !freeToUseSelectedRowKeys?.length &&
              record.text != 'Public' ? (
              <Row justify={'space-evenly'}>
                <Col>
                  <a
                    onClick={() => {
                      setIsEditAccessModalOpen(true);
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

                <Col>
                  <a
                    onClick={() => {
                      setIsEditAccessModalOpen(true);
                    }}
                  >
                    <MdManageAccounts
                      size={'1.5em'}
                      color='grey'
                    />
                  </a>
                </Col>
                <Col>
                  <a onClick={() => {}}>
                    <MdOutlineDeleteOutline
                      size={'1.5em'}
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
          dataIndex: 'owner',
          key: 'owner',
          width: '15%',
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
          width: '30%',
          render: (_, record) => {
            return !myCheckedInSelectedRowKeys?.length &&
              record.text != 'Public' ? (
              <Row
                gutter={8}
                justify={'space-evenly'}
              >
                <Col>
                  <a
                    onClick={() => {
                      setIsEditAccessModalOpen(true);
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
                      setIsEditAccessModalOpen(true);
                    }}
                  >
                    <MdManageAccounts
                      size={'1.5em'}
                      color='grey'
                    />
                  </a>
                </Col>
                <Col>
                  <a onClick={() => {}}>
                    <MdOutlineDeleteOutline
                      size={'1.5em'}
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
    {
      key: '10',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: 'a11',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },

    {
      key: 'a12',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: 'a13',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
  ];
  const data2 = [
    {
      key: '11',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '22',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '33',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '44',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '55',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '66',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '77',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '88',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '99',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
  ];
  const data3 = [
    {
      key: '111',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '222',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '333',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '444',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '555',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '666',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
    {
      key: '777',
      name: 'Public',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['nice', 'developer'],
    },
    {
      key: '888',
      name: 'Jim Green',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['loser'],
    },
    {
      key: '999',
      name: 'Joe Black',
      lastUpdated: '12 April 2023',
      owner: 'Admin',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      {myCheckedInSelectedRowKeys?.length == 0 &&
        freeToUseSelectedRowKeys?.length == 0 && (
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
          {myCheckedInSelectedRowKeys.length == 0 ? (
            <Table
              pagination={{ pageSize: 10, position: ['bottomLeft'] }}
              style={{ width: '100%' }}
              columns={freeToUseColumns}
              dataSource={data}
              size='small'
              rowSelection={freeToUseRowSelection}
            />
          ) : (
            <>
              <Row
                justify={'center'}
                align={'middle'}
                style={{ height: '50%' }}
              >
                <Col span={12}>
                  <Button
                    style={{
                      width: '100%',
                      borderRadius: '1em',
                      height: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 0.5em',
                      backgroundColor: '#fafafa',
                      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                    }}
                  >
                    <Typography.Text
                      style={{
                        marginRight: '0.5em',
                        width: '40%',
                        textAlign: 'center',
                      }}
                    >
                      Check-in{' '}
                    </Typography.Text>

                    <AiTwotoneLock
                      size={'3em'}
                      color='grey'
                    />
                  </Button>

                  <Button
                    style={{
                      width: '100%',
                      borderRadius: '1em',
                      height: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 0.5em',
                      backgroundColor: '#fafafa',
                      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                      marginTop: '2em',
                    }}
                  >
                    <Typography.Text
                      style={{
                        marginRight: '0.5em',
                        width: '40%',
                        textAlign: 'center',
                      }}
                    >
                      Delete{' '}
                    </Typography.Text>

                    <MdOutlineDeleteOutline
                      size={'3em'}
                      color='#ff7875'
                    />
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>

        <Col span={12}>
          {freeToUseSelectedRowKeys?.length == 0 ? (
            <>
              <Row>
                <Table
                  pagination={{
                    pageSize: myCheckedInSelectedRowKeys.length == 0 ? 3 : 9,
                  }}
                  style={{ width: '100%' }}
                  columns={myCheckedInColumns}
                  dataSource={data2}
                  size='small'
                  rowSelection={myCheckedInRowSelection}
                />
              </Row>

              {myCheckedInSelectedRowKeys.length == 0 && (
                <Row style={{ marginTop: '0em' }}>
                  <Table
                    pagination={{ pageSize: 3 }}
                    style={{ width: '100%' }}
                    columns={othersCheckedInColumns}
                    dataSource={data}
                    size='small'

                    // rowSelection={rowSelection}
                  />
                </Row>
              )}
            </>
          ) : (
            <>
              <Row
                justify={'center'}
                align={'middle'}
                style={{ height: '50%' }}
              >
                <Col span={12}>
                  <Button
                    style={{
                      width: '100%',
                      borderRadius: '1em',
                      height: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 0.5em',
                      backgroundColor: '#fafafa',
                      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                    }}
                  >
                    <Typography.Text
                      style={{
                        marginRight: '0.5em',
                        width: '40%',
                        textAlign: 'center',
                      }}
                    >
                      Check-in{' '}
                    </Typography.Text>

                    <AiTwotoneLock
                      size={'3em'}
                      color='grey'
                    />
                  </Button>

                  <Button
                    style={{
                      width: '100%',
                      borderRadius: '1em',
                      height: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 0.5em',
                      backgroundColor: '#fafafa',
                      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                      marginTop: '2em',
                    }}
                  >
                    <Typography.Text
                      style={{
                        marginRight: '0.5em',
                        width: '40%',
                        textAlign: 'center',
                      }}
                    >
                      Delete{' '}
                    </Typography.Text>

                    <MdOutlineDeleteOutline
                      size={'3em'}
                      color='#ff7875'
                    />
                  </Button>
                </Col>
              </Row>
            </>
          )}
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
    </>
  );
}