import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Auth from './pages/Auth.tsx'
import './main.css'
import Account from './pages/Account.tsx';
import Employee from './pages/Employee.tsx';
import Clients from './pages/Clients.tsx';
// import { store } from './stores/store'
// import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <Provider store={store}> */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Auth />} />
          <Route path='/' element={<App />}>
            <Route path='/account' element={<Account />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/clients' element={<Clients />} />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </Provider>, */}
  </StrictMode>,
)
