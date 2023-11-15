import { Button } from 'antd';
import { useSignupQuery } from './app/services/auth';
import { apiSlice } from './app/apiSlice';
import { auth } from './app/services/auth';

export default function DummyPage() {
  const [trigger, results, { data }] = auth.endpoints.signup.useLazyQuery();
  return (
    <div>
      <Button
        onClick={() => {
          trigger({
            username: 'alaazamel21',
            full_name: 'Alaa Zamel',
            email: 'alaa.zamel20@gmail.com',
            password: '12341234',
          });
        }}
      >
        signup
      </Button>
      {data}
    </div>
  );
}
