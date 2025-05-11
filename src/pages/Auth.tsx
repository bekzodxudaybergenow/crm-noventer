import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { apiClient } from '../utils/ApiClient';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

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
    <div className='flex justify-center items-center h-[100vh] bg-[#17153B]'>
        <Form
          className='w-[500px] bg-white/10 backdrop-blur-sm rounded flex flex-col justify-center !px-12 !pt-12 !pb-15 shadow-2xl'
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
        >
        <img className='w-[200px] m-auto pb-8' src={logo} alt="" />
        <Form.Item<FieldType> label="Telefon raqam" name="phone_number" rules={[{ required: true, message: 'Please input your username!' }]}><Input size='large' className='text-[#17153B] placeholder:!text-gray-400' placeholder='+998 00 000 00 00' />
        </Form.Item>

        <Form.Item<FieldType> className='!text-white' label="Parol" name="password"rules={[{ required: true, message: 'Please input your password!' }]}><Input.Password size='large' className='text-[#17153B] placeholder:!text-gray-400 mb-4' placeholder='******' />
        </Form.Item>

        <Button className='text-left !bg-[#5a00db] !text-white hover:!bg-[#5b00dbcb]' size='large' type="primary" htmlType="submit">Tizimga kirish</Button>
      </Form>
    </div>
  )
}
