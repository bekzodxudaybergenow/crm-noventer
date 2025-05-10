import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-[#0E041D] text-white w-[26%] h-[100vh] py-15 px-10">
      <div className="flex flex-col gap-y-3">
        <Link className="font-[600]" to={'/account'}>Rahbar</Link>
        <Link className="font-[600]" to={'/employee'}>Xodimlar</Link>
        <Link className="font-[600]" to={'/clients'}>Mijozlar</Link>
      </div>
    </div>
  )
}
