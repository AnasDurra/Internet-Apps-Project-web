import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import Dragger from 'antd/es/upload/Dragger';
import { BsPerson } from 'react-icons/bs';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { TiUploadOutline } from 'react-icons/ti';

const fileProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function NewFileModal({ isOpen, setOpen }) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      okText={'Save'}
      width={'40%'}
      title={'Add New File'}
    >
      <div style={{ margin: '2em' }}>
        <Title
          level={5}
          style={{ margin: '1rem 0' }}
        >
          File
        </Title>

        <Dragger {...fileProps}>
          <TiUploadOutline size={'2em'} />
          <p>Click or drag file to this area to upload</p>
        </Dragger>

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
