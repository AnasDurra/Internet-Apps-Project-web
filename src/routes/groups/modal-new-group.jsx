import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import { BsPerson } from 'react-icons/bs';
import { useCreateQuery, useLazyCreateQuery } from '../../app/services/folders';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';

export default function NewGroupModal({ isOpen, setOpen }) {
  const { create, results } = useLazyCreateQuery();
  const [form] = useForm();
  return (
    <Modal
      open={isOpen}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      okText={'Save'}
      width={'40%'}
      title={'Add New Group'}
    >
      <Form
        form={form}
        onFinish={(fields) => {}}
      >
        <div style={{ margin: '2em' }}>
          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            Name
          </Title>
          <Form.Item
            label='Group Name'
            name='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: '40%' }}
              placeholder='Enter Group Name'
            />
          </Form.Item>

          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            People With Access
          </Title>

          <Form.List>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.length == 0 && <Empty>No Added Users</Empty>}
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{ margin: '1em 0' }}
                  >
                    <Row>
                      <Col>
                        <BsPerson size={'1.2em'}></BsPerson>
                      </Col>
                      <Col
                        offset={1}
                        span={4}
                      >
                        <Typography.Text>@anas_rish</Typography.Text>
                      </Col>
                    </Row>
                  </div>
                ))}

                <Title level={5}> Add People</Title>
                <Form.Item name={'addUser'}>
                  <Space>
                    <Input placeholder='Username' />
                    <Button
                      onClick={() => {
                        if (form.getFieldValue(['addUser'])) add();
                      }}
                    >
                      add
                    </Button>
                  </Space>
                </Form.Item>

                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>

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
      </Form>
    </Modal>
  );
}
