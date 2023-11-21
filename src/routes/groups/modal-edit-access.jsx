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

const { useToken } = theme;

export default function EditAccessModal({ isOpen, setOpen }) {
  const { token } = useToken();
  const [form] = useForm();
  return (
    <Modal
      open={isOpen}
      footer={null}
      width={'40%'}
      title={'Create New Group'}
      onCancel={() => setOpen(false)}
    >
      <Form
        form={form}
        onFinish={(fields) => {
          console.log('fields', fields);
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
                  style={{ marginTop: '1em' }}
                  itemLayout='horizontal'
                  dataSource={users}
                  renderItem={(item, index) => (
                    <List.Item
                      extra={
                        <Button
                          type='text'
                          danger
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

          {/*    <div style={{ margin: '1em 0' }}>
          <Row>
            <Col>
              <BsPerson size={'1.2em'}></BsPerson>
            </Col>
            <Col
              offset={1}
              span={4}
            >
              <Typography.Text>@alaa_zamel</Typography.Text>
            </Col>
            <Col span={4}>
              <Select
                style={{ width: '100%' }}
                defaultValue='editor'
                onChange={() => {}}
                options={[
                  { value: 'editor', label: 'Editor' },
                  { value: 'viewer', label: 'Viewer' },
                ]}
              />
            </Col>
            <Col offset={2}>
              <Tag>New</Tag>
            </Col>
          </Row>
        </div> */}

          {/*   <Title level={5}> Add People</Title>
        <Space>
          <Input placeholder='Username' />
          <Button>add</Button>
        </Space> */}
        </div>

        <Space style={{ width: '100%', justifyContent: 'end' }}>
          <Button type='text'>Cancel</Button>
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
