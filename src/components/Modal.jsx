import React from 'react'

const Modal = ({children, toggle, extra=''}) => {
  return (
    <>
    {toggle && (
      <div className={`z-[999999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg ${extra}`}>
        {children}
      </div>)}
    </>
  )
}

export default Modal;