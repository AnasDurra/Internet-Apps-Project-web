import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Space,
  Spin,
  Typography,
  message,
} from 'antd';
import {
  UserAddOutlined,
  UserOutlined,
  MailFilled,
  KeyOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import RegisterImage from '../../assets/register.png';
import './style.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../app/services/auth';

const UserRegister = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [signupMutation, { isLoading, isError, error }] = useSignupMutation();
  const [formDisabled, setFormDisabled] = useState(false);
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);

  const success = () => {
    messageApi.open({
      type: 'success',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
      content: 'Registeration complete successfully',
    });
  };

  const warning = (meesage) => {
    messageApi.open({
      type: 'warning',
      content: meesage,
    });
  };

  const wrong = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong!',
    });
  };

  useEffect(() => {},[]);

  const onFinish = async (values) => {
    const credentials = {
      username: values.username,
      full_name: values.first_name + ' ' + values.last_name,
      email: values.email,
      password: values.password,
    };
    try {
      const result = await signupMutation(credentials);
      if (result.error) {
        if (result.error.status === 400) {
          const errorType = result.error.data.message.split(' ')[0];
          if (errorType === 'username') {
            setEmailWarning(false);
            setUsernameWarning(true);
            warning(result.error.data.message);
          } else if (errorType === 'email') {
            setUsernameWarning(false);
            setEmailWarning(true);
            warning(result.error.data.message);
          }
        } else {
          wrong();
        }
      } else {
        setEmailWarning(false);
        setUsernameWarning(false);
        success();
        setFormDisabled(true);
        setTimeout(() => {
          navigate('/login');
          setFormDisabled(false);
        }, 2000);
      }
    } catch (error) {
      wrong();
    }
  };
  return (
    <div className='user-register-page'>
      {contextHolder}
      <Space
        style={{
          marginBottom: '20px',
        }}
      >
        <UserAddOutlined
          style={{
            fontSize: '40px',
            backgroundColor: '#b3cde0',
            padding: '10px',
            borderRadius: '40px',
          }}
        />
        <Typography.Title
          style={{
            marginLeft: '15px',
          }}
          level={3}
        >
          Registration
        </Typography.Title>
      </Space>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            border: '2px solid #f0f0f0',
            borderRadius: '20px',
            width: '85%',
            height: '100%',
          }}
        >
          <Spin
            spinning={isLoading || formDisabled}
            tip={<span style={{ fontSize: '16px' }}>Please Wait...</span>}
          >
            <div className='register-form'>
              <Form
                layout='vertical'
                className='register-form-items'
                autoComplete='off'
                onFinish={onFinish}
              >
                <Form.Item
                  name={'first_name'}
                  label={'Fist Name'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!',
                    },
                  ]}
                >
                  <Input placeholder={'First Name'} />
                </Form.Item>
                <Form.Item
                  name={'last_name'}
                  label={'Last Name'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name!',
                    },
                  ]}
                >
                  <Input placeholder={'Last Name'} />
                </Form.Item>
                <Form.Item
                  name={'email'}
                  label={'Email Address'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address',
                    },
                    {
                      max: 255,
                      message: 'Email is too long',
                    },
                  ]}
                >
                  <Input
                    status={emailWarning ? 'warning' : ''}
                    prefix={<MailFilled style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={'Email'}
                  />
                </Form.Item>
                <Form.Item
                  name={'username'}
                  label={'username'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input
                    status={usernameWarning ? 'warning' : ''}
                    prefix={
                      <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder={'Username'}
                  />
                </Form.Item>
                <Form.Item
                  name={'password'}
                  label={'Password'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder={'password'}
                  />
                </Form.Item>

                <Form.Item
                  name='confirmPassword'
                  label='Confirm Password'
                  required
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords do not match!')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={
                      <KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Confirm Password'
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={isLoading}
                    className='custom-button'
                    style={{
                      fontSize: '18px',
                    }}
                    block
                    htmlType='submit'
                  >
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginTop: '11px' }}>
                  <Typography.Text
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    Already have an account?
                    <span style={{ marginLeft: '3px' }}>
                      <Link to={'/login'}> Login now</Link>
                    </span>
                  </Typography.Text>
                </Form.Item>
              </Form>
              <div className='register-image'>
                <Image
                  preview={false}
                  src={RegisterImage}
                  width={300}
                ></Image>
              </div>
            </div>
          </Spin>
        </Card>
      </div>
    </div>
  );
};

export default UserRegister;
