import {
  Avatar,
  Button,
  Col,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  theme,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import { BsPerson } from 'react-icons/bs';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import {
  useLazyGetFoldersQuery,
  useUpdateFolderMutation,
} from '../../app/services/folders';
import { useGetUsersQuery } from '../../app/services/users';
import { useEffect, useState } from 'react';
import { successMessage } from '../../components/messages.api';

export default function EditGroupModal({ isOpen, setOpen, folder }) {
  const [updateFolder] = useUpdateFolderMutation();
  const { data: users, isLoading } = useGetUsersQuery();

  const [form] = useForm();
  const [selectedUserId, setSelectedUserId] = useState();
  const [filteredOptions, setFilteredOptions] = useState();

  const closeModal = () => {
    setSelectedUserId(null);
    setOpen(false);
  };

  const updateFilteredOptions = () =>
    setFilteredOptions(
      users
        ?.filter(
          (user) => !form.getFieldValue(['currentUsers'])?.includes(user)
        )
        .map((user) => ({
          value: user.id,
          label: `@${user.username}  (${user.full_name})`,
        }))
    );

  useEffect(() => {
    updateFilteredOptions();
  }, [users]);

  useEffect(() => {
    form.setFieldValue(
      ['currentUsers'],
      users?.filter((user) =>
        folder?.accessList?.map((access) => access.user_id).includes(user.id)
      )
    );
    form.setFieldValue(['name'], folder?.name);
    updateFilteredOptions();
  }, [folder,isOpen]);

  return (
    <Modal
      open={isOpen}
      footer={null}
      width={'40%'}
      title={'Create New Group'}
      onCancel={closeModal}
    >
      <Form
        form={form}
        onFinish={(fields) => {
          console.log('fields', {
            name: fields.name,
            access_list: fields.currentUsers?.map((user) => user.id),
          });
          updateFolder({
            id: folder.id,
            name: fields.name,
            access_list: fields.currentUsers?.map((user) => user.id),
          })
            .unwrap()
            .then(() => {
              closeModal();
              successMessage({ content: `folder ${fields.name} updated` });
            });
          //TODO middleware for server side error
        }}
      >
        <div style={{ margin: '2em' }}>
          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            Name
          </Title>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: '40%' }}
              placeholder='Enter Group Name*'
            />
          </Form.Item>

          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            People With Access
          </Title>

          <Form.Item
            name='currentUsers'
            hidden
          />
          <Row wrap>
            <Col span={12}>
              <Select
                style={{ width: '100%' }}
                size='large'
                loading={isLoading}
                showSearch
                onChange={(newValue) => {
                  setSelectedUserId(newValue);
                }}
                value={selectedUserId}
                placeholder='username'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={filteredOptions}
                suffixIcon={null}
                allowClear
              />
            </Col>
            <Col offset={1}>
              <Button
                size='large'
                onClick={() => {
                  const currentUsers = form.getFieldValue('currentUsers') || [];
                  form.setFieldValue(
                    ['currentUsers'],
                    [
                      ...currentUsers,
                      ...users.filter((user) => user.id === selectedUserId),
                    ]
                  );
                  setSelectedUserId(null);
                  updateFilteredOptions();
                }}
              >
                add
              </Button>
            </Col>
          </Row>

          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.currentUsers !== curValues.currentUsers
            }
          >
            {({ getFieldValue }) => {
              const currentUsers = getFieldValue('currentUsers') || [];
              return currentUsers.length ? (
                <List
                  style={{
                    marginTop: '1em',
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                  itemLayout='horizontal'
                  dataSource={currentUsers}
                  renderItem={(item, index) => (
                    <List.Item
                      extra={
                        <Button
                          type='text'
                          danger
                          onClick={() => {
                            const updatedUsers = [
                              ...form.getFieldValue(['currentUsers']),
                            ];
                            updatedUsers.splice(index, 1);
                            form.setFieldValue(['currentUsers'], updatedUsers);
                            updateFilteredOptions();
                          }}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                          />
                        }
                        title={`@${item.username} (${item.full_name})`}
                        /* description={
                          index == 0 ? 'owner' : null
                        } */
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty
                  style={{ margin: '1.5em' }}
                  description={'No Users'}
                />
              );
            }}
          </Form.Item>
        </div>

        <Space style={{ width: '100%', justifyContent: 'end' }}>
          <Button
            type='text'
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            htmlType='submit'
          >
            Update
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
