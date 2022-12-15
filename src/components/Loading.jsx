import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';

export const Loading = () => {
  const {setLoading, clearLoading, loading} = useContext(ApplicationContext);

  return (
    // TODO: change to icon later
    <>
        {
            loading && 
            (
                <div className='w-screen h-screen absolute top-0 right-0 bg-gray-300 bg-opacity-50 z-[99999999999] flex flex-col justify-center items-center'>
                    <div className='p-5 border-4 border-t-transparent torotate rounded-full border-gray-500'></div>
                </div>
            )
        }
    </>
   
  )
}
