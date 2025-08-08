import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {

  const { dToken, dashboardData, setDashboardData, getDashboardData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashboardData()
  }, [dToken, completeAppointment, completeAppointment])

  return dashboardData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.earning_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashboardData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointment_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt="" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p>Latest Appointments</p>
        </div>

        <div className='border border-t-0'>
          {
            dashboardData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200'>
                <img src={item.userData.image} alt="" className='rounded-full w-10' />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
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

    </div>
  )
}

export default DoctorDashboard;