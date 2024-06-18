import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../auth/Store";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'

const ViewUser = () => {

  const [show, setShow] = useState(false);
  const [modelData, setModelData] = useState([]);
  const { authorizationToken, getAllUsers, allUser, api } = useAuth();
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeletedId] = useState("");
  const [inputError, setInputError] = useState("");

  const modelClose = () => {
    setShow(false);
    setUpdateId('');
    setDeletedId('');
  }

  const handleShow = async (id) => {
    try {
      setUpdateId(id);
      setShow(true);
      const response = await fetch(`${api}/getuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      var data = await response.json();
      setModelData(data[0]);
    } catch (error) {
      console.log("Error get sungle user : ", error);
    }
  }

  const modelInputChange = (e) => {
    setModelData({
      ...modelData, [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/updateuser/${updateId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(modelData)
      });

      const data = await response.json();

      if (response.ok) {
        getAllUsers();
        setShow(false);
        toast.success("User Updated Successfully");
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error while updating user : ", error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${api}/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        toast.success("User Deleted Successfully")
        getAllUsers();
        setShow(false);
        setDeletedId('');
      } else {
        toast.error("Error In Deleting User");
      }
    } catch (error) {
      console.log("Error from deleting user : ", error);
    }
  }

  const handleDelete = (id) => {
    setShow(true);
    setDeletedId(id)
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className='h-16 flex justify-between items-center py-3 mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View User</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / View User</p>
        </div>
      </div>
      <section className="py-3">
        <div className='container'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-md p-2'>
              <h1 className='text-2xl text-center mb-4 text-purple-500 font-bold'>All User</h1>
              <div className="table-responsive">
                <table className="table">
                  <caption>List of users</caption>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allUser?.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td className=''>
                              {`${val.firstname}${val.lastname}`}
                            </td>
                            <td>{val.email}</td>
                            <td>{val.phone}</td>
                            <td>
                              <i className="fa-regular fa-pen-to-square cursor-pointer text-purple-500 mr-3" onClick={() => handleShow(val._id)}></i>
                              <i className="fa-solid fa-trash cursor-pointer text-red-500 " onClick={() => handleDelete(val._id)}></i>
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
      <Modal show={show} onHide={() => modelClose()}>
        {updateId ?
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update User Data</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" className="form-control" name='firstname' value={modelData.firstname} onChange={modelInputChange} id="firstname" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" className="form-control" name='lastname' value={modelData.lastname} onChange={modelInputChange} id="lastname" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" name='email' value={modelData.email} onChange={modelInputChange} id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Mobile</label>
                  <input type="text" className="form-control" name='phone' value={modelData.phone} onChange={modelInputChange} id="phone" />
                </div>
                <span className='my-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
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
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h1>Are You Sure To Delete User ?</h1>
            </Modal.Body>
            <Modal.Footer>
              <button className='px-3 py-2 rounded-md bg-red-500 hover:text-red-600 text-white' onClick={() => deleteUser(deleteId)}>
                Delete User
              </button>
            </Modal.Footer>
          </>

        }
      </Modal>
    </>
  )
}

export default ViewUser
