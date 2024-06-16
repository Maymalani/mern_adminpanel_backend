import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/Store';

const Login = () => {

  const inputObj = {
    email: "",
    password: ""
  };

  const [inputData, setinputData] = useState(inputObj);
  const [inputError, setInputError] = useState('');

  const { storeTokenInLs, api } = useAuth();

  const inputHandle = (e) => {
    // const { name, value } = e.target;
    setinputData({
      ...inputData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLs(data.token)
        setinputData(inputObj)
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("LOgin Error " + error);
    }
  }

  return (
    <>
      <section className='h-screen w-screen grid place-items-center'>
        <form className="flex flex-col col-10 col-sm-8 col-md-6 col-lg-4 px-3 sm:px-5 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
          <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Login</h1>
          <label htmlFor='email'>Email</label>
          <input
            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
            type="email"
            id='email'
            name='email'
            required
            value={inputData.email}
            onChange={inputHandle}
          />
          <label htmlFor='password'>Password</label>
          <input
            className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
            type="password"
            id='password'
            name='password'
            value={inputData.password}
            onChange={inputHandle}
          />
          <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
          <NavLink className="text-blue-500 text-xs text-right mb-3">Forgot Password ?</NavLink>
          <input type="submit" value="Login Now" className="mx-auto w-1/2 mb-3 bg-purple-500 text-white rounded-md py-2 " />
        </form>
      </section>
    </>
  )
}

export default Login
