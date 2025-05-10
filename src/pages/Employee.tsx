import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient";

export default function Employee() {
  const [employee, setEmployee] = useState<any>(null);
  
  const getEmployee = async () => {
    const token = sessionStorage.getItem("token");
    let res = await apiClient.get('/api/v1/employee/employees/', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
    setEmployee(res.data);
    console.log(res.data);
}

useEffect(() => {
  getEmployee();
}, []);

  return (
    <div>Employee</div>
  )
}
