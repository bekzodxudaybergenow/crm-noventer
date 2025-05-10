import { useEffect, useState } from "react";
import { apiClient } from "../utils/ApiClient";


export default function Clients() {
  type Client = {
    id: number;
    name: string;
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
    console.log(res.data.results);
  }

  useEffect(() => {
    getClients();
  }, []);
  
  return (
    <div className="pt-25 pl-20">
      <h2 className="font-bold text-2xl mb-5">Mijozlar</h2>
      <div className="grid grid-cols-1">
        {
          clients.map((client: Client) => {
            return (
              <div key={client.id}>
                <h2>{client.name}</h2>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


