import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'
import { FaBusinessTime, FaUserAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";


export default function Sidebar() {
  return (
    <div className="flex flex-col shadow-2xl rounded-[10px] m-4 text-white min-w-[340px] min-h-[100%] py-15 px-10 bg-white/10 backdrop-blur-sm ">
      <img className='w-[200px] pb-8 mb-2' src={logo} alt="" />
      <div className="flex flex-col gap-y-3">
        <Link className="font-[500] flex gap-2 hover:text-[#5A00DB] duration-300" to={'/account'}><FaUserAlt />Rahbar haqida</Link>
        <Link className="font-[500] flex items-center gap-2 hover:text-[#5A00DB] duration-300" to={'/employee'}><HiUsers size={20} className="ml-[-2px]" />Xodimlar ro'yxati</Link>
        <Link className="font-[500] flex gap-2 items-center hover:text-[#5A00DB] duration-300" to={'/clients'}> <HiUsers size={20} className="ml-[-2px]" />Mijozlar ro'yxati</Link>
        <Link className="font-[500] flex gap-2 items-center hover:text-[#5A00DB] duration-300" to={'/shifts'}> <FaBusinessTime size={20} className="ml-[-2px]" />Gallashuv ro'yxati</Link>
      </div>
    </div>
  )
}
