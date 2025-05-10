import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { apiClient } from '../utils/ApiClient';
import { useNavigate } from 'react-router-dom'

type FieldType = {
  phone_number?: string;
  password?: string;
  remember?: string;
};
export default function Auth() {
  const navigate = useNavigate();
  const getStorage = (): void => {
    sessionStorage.setItem('isAuth', 'true');
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await apiClient.post('/api/v1/accounts/login/', values);
      const accessToken = res.data.data.tokens.access;
      sessionStorage.setItem('token', accessToken); 
      navigate('/account');
      getStorage()
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Form
          className='w-[100%] !ml-[120px]'
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
        >
        <Form.Item<FieldType> label="Phone number" name="phone_number" rules={[{ required: true, message: 'Please input your username!' }]}><Input />
        </Form.Item>

        <Form.Item<FieldType> label="Password" name="password"rules={[{ required: true, message: 'Please input your password!' }]}><Input.Password />
        </Form.Item>

        <Button className='text-left'  type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}
