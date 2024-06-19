import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/Store';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

const ViewCourse = () => {

  const [show, setShow] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const { authorizationToken, getAllCourse, courseData, api } = useAuth();
  const [deleteId, setDeletedId] = useState('');
  const [inputError, setInputError] = useState("");

  const handleClose = () => {
    setShow(false);
    setUpdateId('');
    setDeletedId('');
  }

  const [modelUpdateData, setModelUpdateData] = useState([]);

  const handleShow = async (id) => {
    console.log(id);
    setUpdateId(id);
    setShow(true);
    try {
      const response = await fetch(`${api}/getCourse/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setModelUpdateData(data);
      }
    } catch (error) {
      console.log("Error from fetching course data");
    }
  }

  const modelInputHandle = (e) => {
    var { name, value } = e.target;
    setModelUpdateData({
      ...modelUpdateData, [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/updateCourse/${updateId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(modelUpdateData)
      });

      var data = await response.json();

      if (response.ok) {
        setShow(false);
        setUpdateId("");
        getAllCourse();
        toast.success("Course Updated Successfully")
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error from updating course : ", error);
    }
  }

  const handleDelete = (id) => {
    setShow(true);
    setDeletedId(id);
  }

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`${api}/deleteCourse/${id}`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        toast.success("Course Deleted Successfully");
        setDeletedId('');
        setShow(false);
        getAllCourse();
      } else {
        toast.error("Error in deleting course");
      }
    } catch (error) {
      console.log("Error from delete course : ", error);
    }
  }

  useEffect(() => {
    getAllCourse();
  }, [])

  return (
    <>
      <div className='h-16 flex justify-between items-center py-3 mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Course</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / View Course</p>
        </div>
      </div>
      <section className="py-3">
        <div className='container'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-md p-2'>
              <h1 className='text-2xl font-bold text-purple-500 text-center mb-4'>All Course</h1>
              <div className="table-responsive">
                <table className="table">
                  <caption>List of Courses</caption>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Course Name</th>
                      <th scope="col">Added By</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      courseData?.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{val.course}</td>
                            <td>{val.addedBy}</td>
                            <td>
                              <i className="fa-regular fa-pen-to-square cursor-pointer text-purple-500 mr-3" onClick={() => handleShow(val._id)}></i>
                              <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDelete(val._id)}></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose}>
        {updateId ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Course Name</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-group my-3">
                  <label htmlFor="course">Course Name</label>
                  <input type="text" className="form-control" name='course' id="course" value={modelUpdateData.course} onChange={modelInputHandle} />
                </div>
                <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
              </Modal.Body>
              <Modal.Footer>
                <button type='submit' className='px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white'>
                  Save Changes
                </button>
              </Modal.Footer>
            </form>
          </>
          :
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h1>Are You Sure To Delete Course ?</h1>
            </Modal.Body>
            <Modal.Footer>
              <button className='px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white' onClick={() => deleteCourse(deleteId)}>
                Delete Course
              </button>
            </Modal.Footer>
          </>
        }
      </Modal>
    </>
  )
}

export default ViewCourse
