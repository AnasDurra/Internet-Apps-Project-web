import { Button } from 'antd';
import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from './app/services/auth';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const dummyData = {
  username: 'anas',
  password: '12341234',
  full_name: 'Alaa Zamel',
  email: 'doma@gmail.com',
};

export default function DummyPage() {
  const [trigger, results] = useSignupMutation();
  const [trigger2, { data }] = useLoginMutation();
  const [trigger3] = useLogoutMutation();

  useEffect(() => {
    if (results.data?.accessToken)
      Cookies.set('accessToken', data?.accessToken, {
        expires: 12,
      }); //TODO encrypt before saving
  }, [results.data]);

  useEffect(() => {
    if (data?.accessToken)
      Cookies.set('accessToken', data?.accessToken, {
        expires: 12,
      });
  }, [data?.accessToken]);

  return (
    <div>
      <Button
        onClick={() => {
          trigger(dummyData);
        }}
      >
        signup
      </Button>

      <Button
        onClick={() => {
          trigger2({
            username: dummyData.username,
            password: dummyData.password,
          });
        }}
      >
        login
      </Button>

      <Button
        onClick={() => {
          trigger3();
        }}
      >
        logout
      </Button>
    </div>
  );
}
