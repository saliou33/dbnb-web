import React from 'react'

const InputGroup = ({id, type, label, value=undefined, placeholder=''}) => {
  return (
    <div className='flex flex-col w-full gap-1'>
      <label htmlFor={id} className='sm:text-[1.3rem] font-semibold hover:text-green-400'> {label} </label>

      <input type={type} placeholder={placeholder} value={value} className='sm:p-3 p-2 focus:border-b-4 sm:text-[1.2rem] border-gray-800 w-full outline-none bg-gray-200 rounded-md'/>
    </div>
  )
}

export default InputGroup
