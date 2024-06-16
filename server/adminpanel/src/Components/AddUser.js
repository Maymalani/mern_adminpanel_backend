import React, { useState } from 'react';
import { NavLink , useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/Store';

const AddUser = () => {

  const addUserObj = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: ""
  }

  const [userData, setUserData] = useState(addUserObj);
  const [inputError, setInputError] = useState("");
  const navigate = useNavigate();
  const { api } = useAuth();

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData, [name]: value
    })
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("User Added Successfully");
        navigate("/view-user");
        setUserData(addUserObj);
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.log("User Registration Error : ", error);
    }
  }

  return (
    <>
      <div className='h-16 flex justify-between items-center mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add User</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / Add User</p>
        </div>
      </div>
      <section>
        <div className='grid place-items-center'>
          <form className="flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={submitHandle}>
            <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Add User</h1>
            <input
              className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
              placeholder='First Name'
              type="text"
              name='firstname'
              onChange={inputHandle}
              value={userData.firstname}
            />
            <input
              className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
              placeholder='Last Name'
              type="text"
              name='lastname'
              onChange={inputHandle}
              value={userData.lastname}
            />
            <input
              className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
              placeholder='Email'
              type="email"
              name='email'
              onChange={inputHandle}
              value={userData.email}
            />
            <input
              className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
              placeholder='Mobile'
              type="text"
              name='phone'
              onChange={inputHandle}
              value={userData.phone}
            />
            <input
              className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
              placeholder='Password'
              type="password"
              name='password'
              onChange={inputHandle}
              value={userData.password}
            />
            <span style={{ display: inputError.length > 0 ? "block" : "none" }} className='text-red-500 mb-3'>{inputError}</span>
            <input type="submit" value="Add User" className="mx-auto w-1/2 mb-3 bg-purple-500 text-white rounded-md py-2 " />
          </form>
        </div>
      </section>
    </>
  )
}

export default AddUser
