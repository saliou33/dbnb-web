import React from 'react'
import Ornament from '../assets/Ornament.svg'
import Qrcode from '../assets/Qrcode.svg'

const media = 'w-[130px] sm:w-[150px] md:w-[220px]'

const Ornaments = () => {
  return (
    <>
      <img src={Qrcode} alt="Qrcode" className={`absolute top-0 right-0 ${media}`}/>
      <img src={Ornament} alt="Ornament" className={`absolute bottom-0 left-0 ${media}`}/>
    </>
  )
}

export default Ornaments
