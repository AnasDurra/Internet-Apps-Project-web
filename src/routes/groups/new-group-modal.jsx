import { Button, Col, Input, Modal, Row, Select, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import { BsPerson } from 'react-icons/bs';

export default function NewGroupModal({ isOpen, setOpen }) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      okText={'Save'}
      width={'40%'}
      title={'Add New Group'}
    >
      <div style={{ margin: '2em' }}>
        <Title
          level={5}
          style={{ margin: '1rem 0' }}
        >
          Name
        </Title>

        <Input style={{width:"40%"}} placeholder='Enter Group Name'></Input>

        <Title
          level={5}
          style={{ margin: '1rem 0' }}
        >
          People With Access
        </Title>

        <div style={{ margin: '1em 0' }}>
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
              <Tag>Edited (to viewer)</Tag>
            </Col>
          </Row>
        </div>

        <div style={{ margin: '1em 0' }}>
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
        </div>

        <Title level={5}> Add People</Title>
        <Space>
          <Select
            defaultValue='editor'
            onChange={() => {}}
            options={[
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ]}
          />
          <Input placeholder='Username'></Input>
          <Button>add</Button>
        </Space>
      </div>
    </Modal>
  );
}
