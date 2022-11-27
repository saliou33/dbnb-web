import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'
import { Demandeurs } from './components'

const App = () => {

  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route path='history' element={<div></div>}/>
          <Route path='demandeurs' element={<Demandeurs />}/>
          <Route path='statistiques' element={<div></div>}/>
        </Route>
        <Route path="/login" element={<Login />}/>
           
      </Routes>
    </div>
  )
}

export default App
