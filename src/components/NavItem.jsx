import React, { useState } from 'react'
import { NavLink }  from 'react-router-dom';
import { AiFillDownCircle } from 'react-icons/ai';
const NavItem = ({children=undefined, collapse=false, text, href}) => {
  
  const [toggled, setToggled] = useState(false);

  const handleClick = (e) => {
    if (collapse === true) {
      e.preventDefault();
      setToggled(prev => !prev);
      return false;
    }

    return true;
  }

  return (
    <div>
      <div className='flex items-center gap-4 pointer cursor-pointer' onClick={handleClick}>
        <span className='sidebar-link-pin'></span>
        <NavLink to={href} className="text-lg hover:font-semibold hover:text-pink-900" >{text}</NavLink>
        {collapse && <AiFillDownCircle className='text-green-800 text-lg hover:text-green-600'/>}
      </div>
      {toggled && (<div className='flex flex-col sidebar-link-sub rounded-lg'>
            {children}
        </div>
      )}
    </div>
  )
}

export default NavItem