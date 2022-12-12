import React from 'react'

const CustomButton = ({handler=undefined, icon, text}) => {
  return (
    <div className='flex flex-col gap-3 items-center max-w-[10rem]'>

      <h6 className='pink text-[.8rem] text-center'>{text}</h6>
      <button className="green-bg shadow-sm shadow-pink-400 px-8 py-3 rounded-lg w-fit hover:bg-pink-500 hover:shadow-green-400 cursor-pointer" onClick={handler}>
      {icon && <img src={icon} alt={text} className="w-[2.5rem] h-[2.5rem]"  />}
      </button>
    </div>
  )
}

export default CustomButton
