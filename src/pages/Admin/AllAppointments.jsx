import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken, cancelAppointment])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[1fr_2.5fr_1fr_3fr_3fr_1.5fr_1.5fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1fr_2.5fr_1fr_3fr_3fr_1.5fr_1.5fr] items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} alt="" className='w-8 rounded-full' />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} alt="" className='w-8 rounded-full bg-gray-200' />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency} {item.amount}</p>
            {
              item.cancelled ?
                <p className='text-red-600 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ?
                  <p className='text-green-600 text-xs font-medium'>Completed</p>
                  :
                  <div className='flex'>
                    <img src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} />
                  </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments;