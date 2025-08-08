import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) return toast.error('Image Not Selected');
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append("email", email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formData.append('about', about);
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setSpeciality('')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form className='m-5 mt-1 w-full' onSubmit={handleSubmit}>
      <p className='mb-1 text-lg font-medium'>New Doctor Registration</p>
      <div className='bg-white px-8 py-3 border border-gray-300 rounded-2xl w-full max-w-4xl shadow-lg'>

        <div className='flex items-center gap-4 mb-2 text-gray-500'>
          <label htmlFor='doc-img'>
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className='w-16 bg-gray-100 rounded-full cursor-pointer' />
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p>Upload Profile Photo</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-2'>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Doctor's Name</p>
              <input type="text" placeholder='Enter full name' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Email Address</p>
              <input type="email" placeholder='Enter email address' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Password</p>
              <input type="password" placeholder='Create a password' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Medical Degree</p>
              <input type="text" placeholder='e.g., MBBS, MD, MS' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setDegree(e.target.value)} value={degree} />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-2'>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Specialization</p>
              <select name="" id="" className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="">-- Select Specialization --</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynaecologist">Gynaecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Cardiologist">Cardiologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Experience</p>
              <select className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setExperience(e.target.value)} value={experience}>
                <option value="">-- Select Experience --</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="7 Year">7 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Consultation Fee (₹)</p>
              <input type="number" placeholder='Enter consultation fee' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setFees(e.target.value)} value={fees} />
            </div>

            <div className='flex-1 flex flex-col gap-0.5'>
              <p>Clinic Address</p>
              <input type="text" placeholder='Address Line 1' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setAddress1(e.target.value)} value={address1} />
              <input type="text" placeholder='Address Line 2' required className='border border-gray-400 rounded px-3 py-1.5' onChange={(e) => setAddress2(e.target.value)} value={address2} />
            </div>

          </div>
        </div>
        <div>
          <p className='mb-2'>About the Doctor</p>
          <textarea rows={4} placeholder='Brief description' required className='w-full px-4 pt-2 border border-gray-400 rounded-2xl resize-none' onChange={(e) => setAbout(e.target.value)} value={about} />
        </div>
        <button className='bg-primary px-10 py-3 text-white rounded-4xl cursor-pointer'>Create Profile</button>
      </div>
    </form>
  )
}

export default AddDoctor;