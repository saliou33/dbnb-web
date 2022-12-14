import React from 'react'

const ButtonSubmit = ({text, handler, style}) => {
  return (
    <button 
    type="submit" 
    className={style}
    onClick={handler}>{text}</button>
  )
}

export default ButtonSubmit