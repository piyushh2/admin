import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>Available Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div key={index} className='border border-indigo-200 rounded-xl max-w-52 overflow-hidden cursor-pointer group'>
            <img src={item.image} alt="" className='bg-indigo-100 group-hover:bg-indigo-300 transition-all duration-300' />
            <div className='p-3'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-md'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList;