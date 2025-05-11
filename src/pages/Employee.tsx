import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient";
import { Select, Space } from 'antd';
import employeeImg from '../assets/employee.png';

interface Branch {
  id: string;  
  name: string;
}
type Employee = {
  id: number;
  user_full_name: string;
};
export default function Employee() {
  const [employees, setEmployee] = useState<Employee[]>([]);
  const [companyBranch, setCompanyBranch] = useState<Branch[]>([]);

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
  
  const getEmployee = async (id: string) => {
    const token = sessionStorage.getItem("token");
    let res = await apiClient.get(`/api/v1/employee/employees/branch/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
    setEmployee(res.data.results);
}
      
  useEffect(() => {
    getCompany();
  }, []);

  const handleChange = (value: string) => {
    getEmployee(value)
  };
  
  return (
    <div className="pt-4 pl-2 m-4">
      <h2 className="font-bold text-2xl mb-5 text-white pt-8">Xodimlarimiz: </h2>
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
    <div className="grid grid-cols-4 w-auto gap-4">
      {
        employees.map((employee: Employee) => {
          return (
            <div key={employee.id} className="flex items-center text-white rounded-2xl bg-white/30 backdrop-blur-sm py-2 px-2">
              <img className="w-[80px]" src={employeeImg} alt="" />
              <h2 className="font-bold capitalize text-[15px]">{employee.user_full_name}</h2>
            </div>
          )
        })
      }
    </div>

    </div>
  )
}
