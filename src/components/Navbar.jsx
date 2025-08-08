import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken');
  }
  return (
    <div className='fixed top-0 w-full flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white z-50'>
      <div className='flex items-center gap-2 text-xs'>
        <img src={assets.admin_logo} alt="" className='cursor-pointer w-36 sm:w-40' onClick={() => navigate('/')} />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? "Admin" : "Doctor"}</p>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar;