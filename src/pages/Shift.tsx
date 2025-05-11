import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient";
import { Button, Modal, Form, Input, Select, Space, TimePicker } from 'antd';
import employeeImg from '../assets/employee.png';



const { Option } = Select;
interface Branch {
  id: string;  
  name: string;
}
type CreateShift = {
    name: string,
    branch: number,
    start_time: string,
    end_time: string
}
interface Shift {
    id: number;
    name: string;
    branch_name: string;
    start_time: string;
    end_time: string;
  }

export default function Shift() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shifts, setShift] = useState<Shift[]>([]);
  const [companyBranch, setCompanyBranch] = useState<Branch[]>([]);
  const [form] = Form.useForm();

  const getCompany = async () => {
    const token = sessionStorage.getItem("token");
    let res = await apiClient.get('/api/v1/company/get/', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "aplication/json",
        },
    });
    setCompanyBranch(res.data.branches);
   } 
  const getShift = async (id: string) => {
    const token = sessionStorage.getItem("token");
    let res = await apiClient.get(`/api/v1/company/shifts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
    setShift(res.data);
  }
  const createShift = async (data: CreateShift) => {
    const token = sessionStorage.getItem("token");
    try {
        await apiClient.post('/api/v1/company/shift-create/', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Gallashni yaratishda xatolik:", error);
      }
  }
  const handleChange = (value: string) => {
    getShift(value)
  };   

  const handleSave = async () => {
    try {
    const values = await form.validateFields();
    const data = {
        name: values.name,
        branch: values.branch,
        start_time: values.start_time.format("HH:mm"),
        end_time: values.end_time.format("HH:mm"),
    };

    createShift(data);

    form.resetFields();
    setIsModalOpen(false);
    } catch (err) {
    console.log("Validatsiya xatosi:", err);
    }
  };
  const deleteShift = async (shiftId: number) => {
    const token = sessionStorage.getItem("token");
    try {
        await apiClient.delete(`/api/v1/company/shift-detail/${shiftId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShift(prev => prev.filter(item => item.id !== shiftId));
      } catch (error) {
        console.error("Shiftni o'chirishda xatolik:", error);
      }
  }

  useEffect(() => {
    getCompany();
  }, []);

  
  return (
    <div className="pt-4 pl-2 m-4">
        <h2 className="font-bold text-2xl mb-5 text-white pt-8">Gallashuv: </h2>
        <div className="flex gap-2">
            <Space wrap>
                <Select
                className="!mb-10 !w-[200px]"
                defaultValue="Filiallar ro'yxati"
                style={{ width: 120 }}
                onChange={handleChange}
                options={
                    companyBranch.map(branch => ({
                    value: branch.id,     
                    label: branch.name
                    }))
                }
                />
            </Space>
            <Button onClick={() => setIsModalOpen(true)}>Gallarni qo'shish</Button>
        </div>
        <div className="grid grid-cols-4 gap-4 w-[920px]">
        {
            shifts.map((shift: any) => {
            return (
                <div key={shift.id} className="flex flex-col items-center w-[100%] text-white rounded-2xl bg-white/30 backdrop-blur-sm pt-2 pb-6 px-2">
                    <img className="w-[80px]" src={employeeImg} alt="" />
                    <p className="font-bold capitalize text-[15px]">{shift.name}</p>
                    <p className="font-bold capitalize text-[15px]">{shift.branch_name}</p>
                    <p className="font-bold capitalize text-[15px]">{shift.start_time}</p>
                    <p className="font-bold capitalize text-[15px]">{shift.end_time}</p>
                    <Button className="mt-5" onClick={() => deleteShift(shift.id)}>O'chirish</Button>
                </div>
             )
            })
        }
        </div>
        <Modal
            title="Yangi Smena Qo'shish"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleSave}
            okText="Saqlash"
            cancelText="Bekor qilish"
            >

            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label={<span className="text-black">Smena nomi</span>}
                    rules={[{ required: true, message: "Iltimos, smena nomini kiriting!" }]}
                >
                <Input placeholder="Masalan: 1-smena" />
                </Form.Item>

                <Form.Item
                    name="branch"
                    label={<span className="text-black">Filial</span>}
                    rules={[{ required: true, message: "Filialni tanlang!" }]}
                    >
                    <Select placeholder="Filialni tanlang">
                        {companyBranch.map((branch) => (
                        <Option key={branch.id} value={branch.id}>
                            {branch.name}
                        </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="start_time"
                    label={<span className="text-black">Boshlanish vaqti</span>}
                    rules={[{ required: true, message: "Boshlanish vaqtini tanlang!" }]}
                    >
                    <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>

                <Form.Item
                    name="end_time"
                    label={<span className="text-black">Tugash vaqti</span>}
                    rules={[{ required: true, message: "Tugash vaqtini tanlang!" }]}
                    >
                    <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}
