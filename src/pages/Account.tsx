import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient"
import { Link } from "react-router-dom";
import bg from '../../public/bg.png';

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
    <div className="m-4">
        <div className="relative shadow">
            <div className="absolute top-10 left-4">
                <h2 className="font-black text-[50px] text-white ">{accountInfo?.full_name}</h2>
                <span className="text-gray-50 font-[500]">{
                accountInfo?.role == 'director' ? 'Rahbar' : accountInfo?.role
                }</span>
            </div>
            <img className="w-full mb-4" src={bg} alt="" />
        </div>
        <div className="grid grid-cols-2 bg-white/10 backdrop-blur-sm shadow-2xl h-[315px]  rounded-[10px] p-10 text-white">
            <div>
                <h2 className="font-bold text-2xl mb-5">Rahbar haqida</h2>
                {
                    accountInfo ? (
                        <ul className="grid gap-y-3">

                            <li><b className="text-[#777777]">Ismi: </b>{accountInfo.full_name}</li>
                            <li><b className="text-[#777777]">Tug'ulgan sana: </b>{accountInfo.birth_date}</li>
                            <li><b className="text-[#777777]">Jinsi: </b>{accountInfo.gender}</li>
                            <li><b className="text-[#777777]">Email: </b>{accountInfo.email}</li>
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
                            <li><b className="text-[#777777]">Kompaniya nomi: </b>{companytInfo.name}</li>
                            <li><b className="text-[#777777]">INN: </b>{companytInfo.stir}</li>
                            <li><b className="text-[#777777]">Ro'yxatdan o'tgan sana: </b>{companytInfo.created_at}</li>
                            <li>
                                <b className="text-[#777777]">Litsenziya: </b><Link to="#" onClick={handleDownload} className=" hover:text-blue-700 duration-300  underline decoration-solid">PDF ni yuklab olish</Link>
                            </li>
                        </ul>
                    )
                    : (<p>Yuklanmoqda...</p>)
                }
            </div>
        </div>
    </div>
  )
}
