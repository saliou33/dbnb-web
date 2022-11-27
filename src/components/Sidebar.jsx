import React from 'react';
import { Card, NavItem } from '../components';
import { BiLogOut } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import CircleOrnament from '../assets/CircleOrnament.svg';
import Logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <div className='relative flex flex-col items-center sidebar h-screen w-[210px] py-8 px-4'>
      <img src={Logo} alt="Logo Dakar Bi Nu Bokk" className='sm:w-[110px]'/>
      <span className='line'></span>
      <h2 className='text-gray-200 font-semibold p-1'> Utilisateur </h2>
      <Card>
        <p>Nom:</p>
        <p>Tel:</p>

        <div className='text-xl'>
         <AiFillSetting className='text-green-800 m-auto cursor-pointer hover:text-green-600'/>
        </div>
      </Card>
      <span className='line'></span>
      <h2 className='text-gray-200 font-semibold p-1'> Gestionnaire </h2>
      <Card>
        <NavItem  text="Demandeurs" href="/demandeurs"/>
        <NavItem  text="QrCode" href="/" collapse={true}>
          <div className='flex flex-col bg-pink bg-pink-100 px-2'>
            <a href='/generate'>Générer</a>
            <a href='/history'>Historique</a>
          </div>
        </NavItem>
        <NavItem  text="Statistiques" href="/"/>
      </Card>

      <p className='absolute bottom-[50px] text-gray-200 flex items-center mt-10 gap-3 text-xl'>
        <BiLogOut/> <span>Logout</span>
      </p>

      <img src={CircleOrnament} alt="Circle Ornament" className='absolute bottom-11 -left-[8rem]'/>
      <img src={CircleOrnament} alt="Circle Ornament" className='absolute top-20 -right-[12.5rem]'/>
    </div>

  )
}

export default Sidebar