import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient"
import { Link } from "react-router-dom";

export default function Account() {
    const [accountInfo, setAccountInfo] = useState<any>(null);
    const [companytInfo, setComponyInfo] = useState<any>(null);

    const getAcount = async () => {
        const token = sessionStorage.getItem("token");
        let res = await apiClient.get('/api/v1/accounts/me/', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });
        setAccountInfo(res.data);
        console.log(res.data);
    }

    const getCompany = async () => {
        const token = sessionStorage.getItem("token");
        let res = await apiClient.get('/api/v1/company/get/', {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "aplication/json",
            },
        });
        setComponyInfo(res.data);
        console.log(res.data);
    }
    useEffect(() => {
        getAcount();
        getCompany();
    }, []);

    const handleDownload =  async (e: React.MouseEvent) => {
        e.preventDefault();
        const url = companytInfo.license_file;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "license.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


  return (
    <div className="grid grid-cols-2 pt-25 pl-20">
        <div>
            <h2 className="font-bold text-2xl mb-5">Rahbar haqida</h2>
            {
                accountInfo ? (
                    <ul className="grid gap-y-3">

                        <li><b>Ismi: </b>{accountInfo.full_name}</li>
                        <li><b>Tug'ulgan sana: </b>{accountInfo.birth_date}</li>
                        <li><b>Jinsi: </b>{accountInfo.gender}</li>
                        <li><b>Email: </b>{accountInfo.email}</li>
                    </ul>
                )
                : (<p>Yuklanmoqda...</p>)
            }
        </div>
        <div>
            <h2 className="font-bold text-2xl mb-5">Kompaniya haqida</h2>
            {
                companytInfo ? (
                    <ul className="grid gap-y-3">
                        <li><b>Kompaniya nomi: </b>{companytInfo.name}</li>
                        <li><b>INN: </b>{companytInfo.stir}</li>
                        <li><b>Ro'yxatdan o'tgan sana: </b>{companytInfo.created_at}</li>
                        <li>
                            Litsenziya: <Link to="#" onClick={handleDownload} className=" hover:text-blue-700 duration-300  underline decoration-solid">PDF ni yuklab olish</Link>
                        </li>
                    </ul>
                )
                : (<p>Yuklanmoqda...</p>)
            }
        </div>
    </div>
  )
}
