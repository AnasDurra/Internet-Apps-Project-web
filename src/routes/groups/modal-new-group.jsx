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
  Typography,
} from 'antd';
import { BsPerson } from 'react-icons/bs';
import { useCreateQuery, useLazyCreateQuery } from '../../app/services/folders';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import {
  DeleteColumnOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';

export default function NewGroupModal({ isOpen, setOpen }) {
  const [createFolder, results] = useLazyCreateQuery();
  const [form] = useForm();

  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

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
          console.log('fields', fields);
          createFolder({ name: fields.name, access_list: fields.users });
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
            name='users'
            hidden
          />

          <Space>
            <Input placeholder='Username' />
            <Button
              onClick={() => {
                const users = form.getFieldValue('users') || [];
                console.log('users in btn', users);
                form.setFieldValue(['users'], [...users, 1]); //TODO user object
              }}
            >
              add
            </Button>
          </Space>

          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.users !== curValues.users
            }
          >
            {({ getFieldValue }) => {
              const users = getFieldValue('users') || [];
              return users.length ? (
                <List
                  style={{
                    marginTop: '1em',
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                  itemLayout='horizontal'
                  dataSource={users}
                  renderItem={(item, index) => (
                    <List.Item
                      extra={
                        <Button
                          type='text'
                          danger
                          onClick={() => {
                            const updatedUsers = [
                              ...form.getFieldValue('users'),
                            ]; // Create a copy of the array
                            updatedUsers.splice(index, 1); // Remove the element at the specified index
                            form.setFieldValue(['users'], updatedUsers);
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
                        title={`${item} (@username)`}
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
            Create
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
