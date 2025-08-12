import React, { useState } from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [edit, setEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
      }
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getProfileData()
      }
      else toast.error(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  return profileData && (
    <div className='mt-auto'>

      <div className='flex gap-4 ml-5'>
        <div className='mt-[15%]'>
          <img src={profileData.image} alt="" className='bg-indigo-300 w-52 sm:w-64 h-52 sm:h-64 object-cover rounded-2xl shadow-lg border border-gray-300' />
        </div>
        <div className='flex-1 border-2 border-gray-300 rounded-2xl p-6 bg-white shadow-md max-w-3xl mt-[10%]'>
          <p className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-1'>{profileData.name}</p>
          <p>{profileData.degree}</p>
          <div className='flex items-center gap-2 text-gray-600 text-sm mb-3 mt-2'>
            <p>{profileData.speciality}</p>
            <button className='px-2 mt-1 py-0.5 bg-gray-100 text-gray-700 border border-gray-300 text-xs rounded-full'>
              {profileData.experience}</button>
          </div>
          <div>
            <p className='text-base font-medium text-gray-700 mb-1'>About</p>
            <p className='text-sm text-gray-600 leading-relaxed'>{profileData.about}</p>
          </div>
          <p className='text-sm text-gray-700 font-medium mt-3'>Appointment Fees :
            <span className='text-gray-800'> {currency} {edit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
          </p>
          <div className='flex gap-2 py-2'>
            <p className='text-gray-700 font-medium'>Address :</p>
            <p className='text-sm font-medium mt-0.5 text-gray-800'>{edit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}<br />{edit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}</p>
          </div>
          {edit ?
            <button className='px-5 py-1.5 border text-sm rounded-full mt-6 hover:bg-[#5F6FFF] hover:text-white transition-all' onClick={updateProfile}>Save Changes</button>
            :
            <button className='px-5 py-1.5 border text-sm rounded-full mt-6 hover:bg-[#5F6FFF] hover:text-white transition-all cursor-pointer' onClick={() => setEdit(true)}>Edit</button>
          }
        </div>
      </div>

    </div>
  )
}

export default DoctorProfile;