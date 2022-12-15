import React, { useContext, useEffect } from 'react'
import { ApplicationContext } from '../context/ApplicationContext'

const StatusMessage = () => {
  const {status, lease, clearStatus} = useContext(ApplicationContext);
  
  useEffect(() => {
    if (status?.msg) {
      setTimeout(() => {
        clearStatus();
      }, lease)
    }

  }, [status?.msg]);

  const handleMsg = (msg) => {

    if(typeof msg === 'object') {
        return (<> {Object.entries(msg).map((v, i) => <p key={i}>{`${v[0]}: ${v[1]}`}</p>)} </>)
    }

    return <p>{msg}</p> 
  }

  return (
    <> 
      { status?.msg && 
          (
            <div className={`${status?.code === 'success'? 'bg-green-700' : 'bg-red-700'}
            absolute top-2 right-2 rounded-md p-2 flex flex-col z-50 text-gray-300 shadow min-w-[14rem]`}>
              <h3 className='font-semibold capitalize underline'>{status?.code}</h3>

              { handleMsg(status?.msg) }
            </div>
          )
      }
    </>
  )

}

export default StatusMessage