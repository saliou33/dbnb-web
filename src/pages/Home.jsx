import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from '../components'

const Home = () => {

  return (
    <div className='flex justify-between main-bg min-h-screen'>
      <Sidebar/>

      <main className='relative z-20 flex-1 xs:h-[40rem] 
      max-h-screen my-auto mx-10 bg-gray-50 rounded-xl p-12 shadow'>
          <Outlet/>
      </main>
    </div>
  )
}

export default Home
