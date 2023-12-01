import {
  Button,
  Col,
  Form,
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
import { BsDownload, BsPerson } from 'react-icons/bs';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { TiUploadOutline } from 'react-icons/ti';
import {
  useCreateFileMutation,
  useUpdateFileMutation,
} from '../../app/services/files';
import { useGetUsersQuery } from '../../app/services/users';
import { successMessage } from '../../components/messages.api';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const { useToken } = theme;

export default function EditFileModal({ isOpen, setOpen, file }) {
  const [updateFile, { isLoading: isUpdateFileLoading }] =
    useUpdateFileMutation();
  const { group_id } = useParams();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    console.log('file', file);
    form.setFieldValue(['name'], file?.name);
    //TODO download file
  }, [file, isOpen]);

  useEffect(() => {
    if (isUpdateFileLoading) {
      messageApi.open({
        type: 'loading',
        content: 'updating file..',
        duration: 0,
      });
    } else messageApi.destroy();
  }, [isUpdateFileLoading]);

  return (
    <Modal
      open={isOpen}
      footer={null}
      width={'40%'}
      title={'Create New file'}
      onCancel={closeModal}
    >
      <Form
        form={form}
        onFinish={(fields) => {
          const formData = new FormData();
          formData.append('name', fields.name);
          formData.append('folder_id', group_id);
          formData.append('file', fields.file.fileList[0].originFileObj);

          updateFile(formData)
            .unwrap()
            .then(() => {
              closeModal();
              successMessage({ content: `file ${fields.name} created` });
            });
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
              placeholder='Enter File Name*'
            />
          </Form.Item>

          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            Download
          </Title>
          <Button><BsDownload></BsDownload></Button>

          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            Update
          </Title>

          <Form.Item
            name='file'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Dragger maxCount={1}>
              <TiUploadOutline size={'2em'} />
              <p>Click or drag file to this area to replace current file</p>
            </Dragger>
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
            update
          </Button>
        </Space>
      </Form>
      {contextHolder}
    </Modal>
  );
}
