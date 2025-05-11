import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
// import Header from './layout/Header'
// import Footer from './layout/Footer'
import Sidebar from './layout/Sidebar'

function App() {
  let isAuth = sessionStorage.getItem('isAuth');
  console.log(isAuth);

  if(isAuth) {
    return (
      <div className='flex bg-[#17153B] h-[100vh]'>
        <Sidebar />
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
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
