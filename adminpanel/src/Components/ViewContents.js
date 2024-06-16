import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/Store';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

const ViewContents = () => {

  const [show, setShow] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const { authorizationToken, allCourseContent, getAllCourseContent, updateContentStatus } = useAuth();
  const [deleteId, setDeletedId] = useState('');
  const [modelUpdateData, setModelUpdateData] = useState([]);
  const [deletedContent,setDeletedContent] = useState("");
  const [inputError, setInputError] = useState("");

  const handleClose = () => {
    setShow(false);
    setUpdateId("");
    setDeletedId("");
  }

  const handleShow = async (id) => {
    setShow(true)
    setUpdateId(id);
    try {
      const response = await fetch(`http://localhost:4000/getCourseContent/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setModelUpdateData(data[0])
      }
    } catch (error) {
      console.log("Error from get course : ", error);
    }
  };

  const modelInputHandle = (e) => {
    const { name, value } = e.target;
    setModelUpdateData({
      ...modelUpdateData, [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/updateCourseContent/${updateId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(modelUpdateData)
      });

      const data = await response.json();

      if (response.ok) {
        setShow(false);
        setUpdateId("");
        setDeletedId("");
        getAllCourseContent();
        toast.success("Course Content Updated Successfully")
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error from updating course content : ", error);
    }
  };

  const deleteContent = async () => {
    try {
      const response = await fetch(`http://localhost:4000/deleteCourseContent/${deleteId}`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        toast.success("Course Deleted Successfully");
        updateContentStatus(deletedContent,"0")
        setDeletedId('');
        setShow(false);
        getAllCourseContent();
      } else {
        toast.error("Error in deleting course");
      }
    } catch (error) {
      console.log("Error from delete course : ", error);
    }
  };

  const handleDelete = (id,course) => {
    setShow(true);
    setDeletedId(id);
    setDeletedContent(course);
  }

  useEffect(() => {
    getAllCourseContent();
  },[]);

  return (
    <>
      <div className='h-16 flex justify-between items-center py-3 mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Course Contents</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / View Course Contents</p>
        </div>
      </div>
      <section className="py-3">
        <div className='container'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-md p-2'>
              <h1 className='text-2xl text-center mb-4 text-purple-500 font-bold'>Course Contents</h1>
              <div className="table-responsive">
                <table className="table">
                  <caption>List of Course Contents</caption>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Course</th>
                      <th scope="col">Contents</th>
                      <th scope="col">Fees</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allCourseContent.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{val.course}</td>
                            <td>{val.courseContents}</td>
                            <td>{val.fees}</td>
                            <td>{val.duration}</td>
                            <td>
                              <i className="fa-regular fa-pen-to-square cursor-pointer text-purple-500 mr-3" onClick={() => handleShow(val._id)}></i>
                              <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDelete(val._id,val.course)}></i>
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
              <Modal.Title>Update Course Content</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-group my-3">
                  <label htmlFor="course">Course Name</label>
                  <input disabled type="text" className="form-control" name='course' id="course" value={modelUpdateData.course} onChange={modelInputHandle} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="courseContents">Content</label>
                  <input type="text" className="form-control" name='courseContents' id="courseContents" value={modelUpdateData.courseContents} onChange={modelInputHandle} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="fees">Fees</label>
                  <input type="text" className="form-control" name='fees' id="fees" value={modelUpdateData.fees} onChange={modelInputHandle} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="duration">Duration</label>
                  <input type="text" className="form-control" name='duration' id="duration" value={modelUpdateData.duration} onChange={modelInputHandle} />
                </div>
                <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
              </Modal.Body>
              <Modal.Footer>
                <button type='submit' className='px-3 py-2 rounded-md bg-purple-500 hover:text-purple-600 text-white'>
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
              <button className='px-3 py-2 rounded-md bg-red-500 hover:text-red-600 text-white' onClick={() => deleteContent()}>
                Delete Course
              </button>
            </Modal.Footer>
          </>
        }
      </Modal>
    </>
  )
}

export default ViewContents
