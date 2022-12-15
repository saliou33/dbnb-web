import React from 'react'

const SectionHeader = ({text}) => {
  return (
    <>
      <h1 className='text-3xl font-bold'>{text}</h1>
      <span className='border-b-2 max-w-64 h-1 border-gray-400 block max-w-[50%]'></span>
    </>
  )
}

export default SectionHeader