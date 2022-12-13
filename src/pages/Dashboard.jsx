import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sections/Sidebar'

const Dashboard = () => {

  return (
    <div className='flex justify-between main-bg min-h-screen'>
      <Sidebar/>

      <main className='relative z-20 flex-1 xs:h-[40rem] max-h-screen 
        my-auto mx-10 bg-gray-50 rounded-xl shadow mt-8 p-8 '>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboard
