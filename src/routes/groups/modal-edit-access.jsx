import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  theme,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Typography from 'antd/es/typography/Typography';
import { BsPerson } from 'react-icons/bs';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

const { useToken } = theme;

export default function EditAccessModal({ isOpen, setOpen }) {
  const { token } = useToken();
  return (
    <Modal
      open={isOpen}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      okText={'Save'}
      width={'40%'}
      title={'Change Group (Public) Access Settings'}
    >
      <div style={{ margin: '2em' }}>
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
