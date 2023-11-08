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
  theme,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import Dragger from 'antd/es/upload/Dragger';
import { BsPerson } from 'react-icons/bs';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { TiUploadOutline } from 'react-icons/ti';
const { useToken } = theme;

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
  const { token } = useToken();

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

        {/* //array */}
        <div style={{ margin: '1em 0' }}>
          <Row>
            <Col>
              <BsPerson
                size={'1.8em'}
                color={token.colorPrimary}
              ></BsPerson>
            </Col>
            <Col
              offset={1}
              span={4}
              style={{ marginBlock: 'auto' }}
            >
              <Typography.Text>@anas_rish</Typography.Text>
            </Col>

            <Col
              style={{ marginBlock: 'auto' }}
              offset={2}
            >
              <Tag>New</Tag>
            </Col>

            <Col
              offset={2}
              style={{ marginBlock: 'auto' }}
            >
              <a>
                <IoIosRemove
                  size={'1.5em'}
                  color={token.colorPrimary}
                ></IoIosRemove>
              </a>
            </Col>
          </Row>
        </div>

        <div style={{ margin: '1em 0' }}>
          <Row>
            <Col>
              <BsPerson
                color={token.colorPrimary}
                size={'1.8em'}
              ></BsPerson>
            </Col>
            <Col
              offset={1}
              span={4}
              style={{ marginBlock: 'auto' }}
            >
              <Typography.Text>@alaa_zamel</Typography.Text>
            </Col>

            <Col
              offset={2}
              style={{ marginBlock: 'auto' }}
            >
              <Tag>New</Tag>
            </Col>
            <Col
              offset={2}
              style={{ marginBlock: 'auto' }}
            >
              <a>
                <IoIosRemove
                  size={'1.5em'}
                  color={token.colorPrimary}
                ></IoIosRemove>
              </a>
            </Col>
          </Row>
        </div>

        <Title
          level={5}
          style={{ margin: '1rem 0' }}
        >
          Removing Access From
        </Title>
        <div style={{ margin: '1em 0' }}>
          <Row>
            <Col>
              <BsPerson
                color={token.colorPrimary}
                size={'1.8em'}
              ></BsPerson>
            </Col>
            <Col
              offset={1}
              span={4}
              style={{ marginBlock: 'auto' }}
            >
              <Typography.Text>@alaa_zamel</Typography.Text>
            </Col>

            <Col
              offset={2}
              style={{ marginBlock: 'auto' }}
            >
              <Tag>New</Tag>
            </Col>
            <Col
              offset={2}
              style={{ marginBlock: 'auto' }}
            >
              <a>
                <IoIosAdd
                  size={'1.4em'}
                  color={token.colorPrimary}
                ></IoIosAdd>
              </a>
            </Col>
          </Row>
        </div>

        <Title level={5}> Add People</Title>
        <Space>
          <Input placeholder='Username'></Input>
          <Button>add</Button>
        </Space>
      </div>
    </Modal>
  );
}
