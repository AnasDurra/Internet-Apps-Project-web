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
import {
  errorMessage,
  loadingMessage,
  successMessage,
} from '../../components/messages.api';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { useToken } = theme;


export default function EditFileModal({ isOpen, setOpen, file }) {
  const [updateFile, { isLoading: isUpdateFileLoading }] =
    useUpdateFileMutation();
  const { group_id } = useParams();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isFormTouched, setIsFormTouched] = useState(false);

  const closeModal = () => {
    form.resetFields();
    setIsFormTouched(false);
    setOpen(false);
  };

  useEffect(() => {
    console.log('file', file);
    form.setFieldValue(['name'], file?.name);
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
        onValuesChange={() => {
          setIsFormTouched(true);
        }}
        onFinish={(fields) => {
          const formData = new FormData();
          formData.append('name', fields.name);
          formData.append('folder_id', group_id);
          if (fields.file)
            formData.append('file', fields.file.fileList[0]?.originFileObj);

          updateFile([formData, file?.id])
            .unwrap()
            .then(() => {
              closeModal();
              successMessage({ content: `file ${fields.name} updated` });
            })
            .catch(() => {});
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
          <Button
            onClick={() => {
              downloadFile(file);
            }}
          >
            <BsDownload />
          </Button>

          <Title
            level={5}
            style={{ margin: '1rem 0' }}
          >
            Update
          </Title>

          <Form.Item name='file'>
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
            disabled={!isFormTouched}
          >
            update
          </Button>
        </Space>
      </Form>
      {contextHolder}
    </Modal>
  );
}

const downloadFile = async (file) => {
  //TODO const URL
  const fileUrl = `http://localhost:8000/${file?.path}`;

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      errorMessage({
        content: `Failed to download file: ${response.status} ${response.statusText}`,
      });
      return;
    }

    const filename = file?.name;
    const extension = file?.path.split('.').pop();
    const fullFilename = `${filename}.${extension}`;

    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fullFilename;
    document.body.appendChild(link);

    link.click();

    loadingMessage({ content: 'Downloading...' });
    document.body.removeChild(link);
  } catch (error) {
    errorMessage({ content: error.message });
  }
};
