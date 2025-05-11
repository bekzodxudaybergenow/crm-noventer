import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import Sidebar from './layout/Sidebar'

function App() {
  let isAuth = sessionStorage.getItem('isAuth');

  if(isAuth) {
    return (
      <div className='flex bg-[#17153B] min-h-[100vh]'>
        <Sidebar />
        <Outlet />
      </div>
    )
  }
  else {
    return (
      <Navigate to={'/login'} />
    )
  }
}

export default App
