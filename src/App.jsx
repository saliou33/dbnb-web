import react, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import { Demandeurs, StatusMessage, ProtectedRoute } from './components'
import { remote } from './utils/api';

import './App.css'
import { UserContext } from './context/UserContext';

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
          <Route path="/dashboard" element={<Home />}>
            <Route index element={<Demandeurs/>} />
            <Route path='history' element={<div></div>}/>
            <Route path='demandeurs' element={<Demandeurs />}/>
            <Route path='statistiques' element={<div></div>}/>
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
