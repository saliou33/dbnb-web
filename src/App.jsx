import react, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Demandeurs from './sections/Demandeurs';
import Details from './sections/Details';
import Groupe from './sections/Groupe';
import { StatusMessage, ProtectedRoute } from './components'
import { remote } from './utils/api';

import './App.css'
import { UserContext } from './context/UserContext';
import Statistiques from './sections/Statistiques';

const App = () => {

  const {user, getToken} = useContext(UserContext);

  useEffect(() => {
    getToken();
  }, [])

  useEffect(() => {
    if(user?.token) {
      remote.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
    }
  }, [user])


  return (
    <div className="w-full min-h-screen">
      <StatusMessage/>
      <Routes>
        <Route path="/" element={<ProtectedRoute to="/login" toggle={!user?.token} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Demandeurs/>} />
            <Route path='qrcode/details' element={<Details />} />
            <Route path='qrcode/groupe' element={<Groupe />} />
            <Route path='statistiques' element={<Statistiques />} />
            <Route path='demandeur' element={<Demandeurs />} />
          </Route>
        </Route>

        <Route path="/login" element={<ProtectedRoute to="/dashboard" toggle={user?.token}/>}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
