import React from 'react'
import { Outlet } from 'react-router-dom'
import { Ornaments } from '../components'
import { Loading } from '../components/Loading'
import Sidebar from '../sections/Sidebar'

const Dashboard = () => {

  return (
    <div className='flex main-bg min-h-screen'>
      <Loading />
      <Sidebar/>

      <main className='relative z-20 flex-1 xs:h-[42rem] max-h-screen overflow-hidden
        my-auto mx-10 bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow mt-8 p-8  max-w-6xl min-w-fit'>
        <Outlet/>
        <Ornaments />
      </main>
    </div>
  )
}

export default Dashboard
