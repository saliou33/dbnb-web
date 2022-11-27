import React from 'react'

const Card = ({children}) => {
  return (
    <div className='relative z-10 flex flex-col rounded-xl bg-gray-100 drop-shadow p-4 w-full gap-3'>
      {children}
    </div>
  )
}

export default Card