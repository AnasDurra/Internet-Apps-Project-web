import { Button } from 'antd';
import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from './app/services/auth';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const dummyData = {
  username: 'zal',
  password: '12341234',
  full_name: 'Alaa Zamel',
  email: 'az10@gmail.com',
};

export default function DummyPage() {
  const [trigger, results] = useSignupMutation();
  const [trigger2, { data }] = useLoginMutation();
  const [trigger3] = useLogoutMutation();

  useEffect(() => {
    if (results.data?.accessToken)
      Cookies.set('accessToken', results.data?.accessToken);
  }, [results.data]);

  useEffect(() => {
    console.log('data tok', data?.accessToken);
    if (data?.accessToken) Cookies.set('accessToken', data?.accessToken);
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
