import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient";
import clientImg from '../assets/client.png';


export default function Clients() {
  type Client = {
    id: number;
    name: string;
    avatar: string;
  };

  const [clients, setClients] = useState<Client[]>([]);
    
  const getClients = async () => {
    const token = sessionStorage.getItem("token");
    let res = await apiClient.get('/api/v1/company/clients/', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
    setClients(res.data.results);
  }

  useEffect(() => {
    getClients();
  }, []);
  
  return (
    <div className="pt-4 pl-2">
      <h2 className="font-bold text-2xl mb-5 text-white pt-8">Mijozlarimiz: </h2>
      <div className="grid grid-cols-4 gap-4">
        {
          clients.map((client: Client) => {
            return (
              <div key={client.id} className="flex items-center text-white rounded-2xl bg-white/30 backdrop-blur-sm p-2">
                <img className="w-[80px]" src={clientImg} alt="" />
                <h2 className="font-bold capitalize">{client.name}</h2>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


