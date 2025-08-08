import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken, completeAppointment, cancelAppointment])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>My Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b' >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Payment</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200 transition-all'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} alt="" className='w-8 rounded-full' />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div>
                <p className='text-xs inline border p-2 rounded-full'>{item.isCompleted ? "Paid" : item.cancelled ? "N/A" : "Pending"}</p>
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
                      <img src={assets.tick_icon} alt="" className='w-10 cursor-pointer' onClick={() => completeAppointment(item._id)} />
                    </div>
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorAppointments;