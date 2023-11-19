import { Button } from 'antd';
import {
  useLazySignupQuery,
  useLoginMutation,
  useLogoutMutation,
} from './app/services/auth';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const dummyData = {
  username: 'zal21azael121',
  password: '12341234',
  full_name: 'Alaa Zamel',
  email: 'az1laaa3zame210@gmail.com',
};

export default function DummyPage() {
  const [trigger, results] = useLazySignupQuery();
  const [trigger2, { data }] = useLoginMutation();
  const [trigger3] = useLogoutMutation();

  useEffect(() => {
    if (results.data?.accessToken)
      Cookies.set('accessToken', results.data?.accessToken);
  }, [results.data]);

  useEffect(() => {
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
