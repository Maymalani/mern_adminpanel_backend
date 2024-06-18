import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/Store';
import { toast } from 'react-toastify'

const AddCourse = () => {

  const { user, authorizationToken, api } = useAuth();
  var userEmail;
  if (user) {
    userEmail = user.email;
  }
  console.log(userEmail);
  const courseObj = {
    addedBy: userEmail,
    course: ''
  }
  const [courseData, setCourseData] = useState(courseObj);
  const navigate = useNavigate();
  const [inputError, setInputError] = useState('');


  const courseInputhandle = (e) => {
    var { name, value } = e.target;
    setCourseData({
      ...courseData, [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/addCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(courseData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Course added successfully");
        navigate('/view-course');
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error from adding course details : ", error);
    }
  }

  return (
    <>
      <div className='h-16 flex justify-between items-center py-3 mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Course</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / Add Course</p>
        </div>
      </div>
      <section>
        <div className='container'>
          <div className='grid place-items-center'>
            <form className="flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
              <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Add Course</h1>
              <label htmlFor='addedBy' className='hidden'>User</label>
              <input
                className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3 hidden"
                type="text"
                value={courseData.addedBy}
                id='addedBy'
                name='addedBy'
                onChange={courseInputhandle}
                disabled
              />
              <input
                className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                placeholder='Course Name'
                type="text"
                name='course'
                id='course'
                value={courseData.course}
                onChange={courseInputhandle}
              />
              <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
              <input type="submit" value="Add Course" className="mx-auto w-1/2 mb-3 bg-purple-500 text-white rounded-md py-2 " />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddCourse
