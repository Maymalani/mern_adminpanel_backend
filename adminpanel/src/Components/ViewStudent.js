import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/Store'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import errorImage from "../assets/Capture.JPG"

const ViewStudent = () => {

  const [tableData, setTableData] = useState([]);
  const { authorizationToken, allStudentData, getAllStudent, api ,setAllStudentData} = useAuth();
  const [show, setShow] = useState(false);
  const [imageUpdateId, setImageUpdateId] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState();

  const handleShow = async (id) => {
    setShow(true);
    try {
      const response = await fetch(`${api}/singleStudent/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
      }
    } catch (error) {
      console.log("Error from getting single user : ", error);
    }
  }

  const searchFun = async () => {
    if (search.length > 0) {
      const response = await fetch(`${api}/searchStudent/${search}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      const data = await response.json();

      if (response.ok) {
        if(data.length > 0){
          setTableData(data);
        }else{
          setTableData([]);
        }
      }
    } else {
      getAllStudent();
    }
  }

  useEffect(() => {
    searchFun();
  }, [search]);

  const handleClose = () => {
    setImageUpdateId('');
    setShow(false);
  }

  const modelImage = (id) => {
    setImageUpdateId(id);
    setShow(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${api}/student/uploadPic/${imageUpdateId}`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken
        },
        body: formData
      });
      if (response.ok) {
        toast.success("Image uploaded successfully");
        setShow(false);
        setImageUpdateId("");
        getAllStudent();
      } else {
        toast.error("Error in uploading image")
      }
    } catch (error) {
      console.log("Error From Uploading Image");
    }
  }

  const deleteImage = async (id) => {
    const result = window.confirm("Are You Sure To Delete Images ?")
    if (result) {
      const response = await fetch(`${api}/student/deletePic/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        }
      });

      if (response.ok) {
        toast.success("Image Deleted Successfully");
        getAllStudent();
      } else {
        toast.error("Error In Deleting Images");
      }
    }
  }

  return (
    <>
      <div className='h-16 flex justify-between items-center py-3 mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Student</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / View Student</p>
        </div>
      </div>
      <section className="py-3">
        <div className='container'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-md p-3'>
              <h1 className='text-2xl text-center mb-3 mr-2 sm:mr-0 sm:mb-0 text-purple-500 font-bold'>All Student</h1>
              <span className='text-xs sm:text-xs md:text-sm lg:text-base lg:text-md text-center mb-2'> <span className='text-red-500 font-bold'>*</span> ( First Whatsapp is for student , Second Whatsapp is for parent In Action Div )</span>
              <div className='mx-auto my-2 w-full sm:w-[70%] md:w-[40%] lg:w-[30%]'>
                <input type="text" placeholder='Search Student Here ...' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full border m-auto mb-3 border-black rounded-md pl-2 pr-8 py-1'/>
              </div>
              {/*<div className='mx-auto mb-2 w-full sm:w-[70%] md:w-[40%] lg:w-[30%] -z-10'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Student Here ...' className='w-full border m-auto mb-3 border-black rounded-md pl-2 pr-8 py-1' />
              </div>*/}
              <div className="table-responsive">
                <table className="table">
                  <caption>List of Students</caption>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Parent Mobile</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {

                      tableData.length > 0 ? 
                      tableData.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>
                              <div className='flex flex-col'>
                                <img src={val.image ? `http://localhost:4000/Images/${val.image}` : errorImage} className='w-[40px] h-[50px] md:w-[80px] md:h-[100px] mr-2' alt={`${val.studentname}`} />
                                <div className={`flex justify-start mt-2`}>
                                  <i className={`fa-solid fa-pen mr-2 cursor-pointer`} onClick={() => modelImage(val._id)}></i>
                                  <i className={`fa-solid fa-trash cursor-pointer text-red-500 ${val.image ? "block" : "hidden"}`} onClick={() => deleteImage(val._id)}></i>
                                </div>
                              </div>
                            </td>
                            <td className='capitalize'>{`${val.studentname} ${val.surname}`}</td>
                            <td>{val.studentMobile}</td>
                            <td>{val.parentMobile}</td>
                            <td>
                              <NavLink to={`/updateStudent/${val._id}`}><i className="fa-regular fa-pen-to-square cursor-pointer text-purple-500 mr-3" title='Update Student Data'></i></NavLink>
                              <NavLink to={`https://wa.me/+91${val.studentWhatsapp}?`} target='_blank' title='Student Whatsapp'><i className="fa-brands fa-whatsapp cursor-pointer text-green-500 mr-3"></i></NavLink>
                              <NavLink to={`https://wa.me/+91${val.parentWhatsapp}?`} target='_blank' title='Parent Whatsapp'><i className="fa-brands fa-whatsapp cursor-pointer text-green-500 mr-3"></i></NavLink>
                              <i className="fa-solid fa-ellipsis-vertical cursor-pointer" title='More Details' onClick={() => handleShow(val._id)}></i>
                            </td>
                          </tr>
                        )
                      }):
                      allStudentData.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>
                              <div className='flex flex-col'>
                                <img src={val.image ? `http://localhost:4000/Images/${val.image}` : errorImage} className='w-[80px] h-[100px] mr-2' alt={`${val.studentname}`} />
                                <div className={`flex justify-start mt-2`}>
                                  <i className={`fa-solid fa-pen mr-2 cursor-pointer`} onClick={() => modelImage(val._id)}></i>
                                  <i className={`fa-solid fa-trash cursor-pointer text-red-500 ${val.image ? "block" : "hidden"}`} onClick={() => deleteImage(val._id)}></i>
                                </div>
                              </div>
                            </td>
                            <td className='capitalize'>{`${val.studentname} ${val.surname}`}</td>
                            <td>{val.studentMobile}</td>
                            <td>{val.parentMobile}</td>
                            <td>
                              <NavLink to={`/updateStudent/${val._id}`}><i className="fa-regular fa-pen-to-square cursor-pointer text-purple-500 mr-3" title='Update Student Data'></i></NavLink>
                              <NavLink to={`https://wa.me/+91${val.studentWhatsapp}?`} target='_blank' title='Student Whatsapp'><i className="fa-brands fa-whatsapp cursor-pointer text-green-500 mr-3"></i></NavLink>
                              <NavLink to={`https://wa.me/+91${val.parentWhatsapp}?`} target='_blank' title='Parent Whatsapp'><i className="fa-brands fa-whatsapp cursor-pointer text-green-500 mr-3"></i></NavLink>
                              <i className="fa-solid fa-ellipsis-vertical cursor-pointer" title='More Details' onClick={() => handleShow(val._id)}></i>
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
      <Modal show={show} onHide={() => handleClose()}>
        {imageUpdateId.length > 0 ?
          <>
            <Modal.Header closeButton>
              <Modal.Title className='text-purple-500'>Select Image</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <Modal.Body>
                <div className='form-input'>
                  <label htmlFor='image' className='mb-3'>Choose Image For Upload</label>
                  <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className='px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white'>Upload Images</button>
              </Modal.Footer>
            </form>
          </>
          :
          <>
            <Modal.Header closeButton>
              <Modal.Title className='text-purple-500'>{`Details For ${studentData.studentname} ${studentData.surname}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-wrap gap-3 justify-between">
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Surname</span>
                  <p className='text-text-dark'>{studentData.surname ? studentData.surname : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Student Name</span>
                  <p className='text-text-dark'>{studentData.studentname ? studentData.studentname : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Student Contact</span>
                  <p className='text-text-dark'>{studentData.studentMobile ? studentData.studentMobile : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Student WhatsApp</span>
                  <p className='text-text-dark'>{studentData.studentWhatsapp ? studentData.studentWhatsapp : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Parent Contact</span>
                  <p className='text-text-dark'>{studentData.parentMobile ? studentData.parentMobile : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Parent WhatsApp</span>
                  <p className='text-text-dark'>{studentData.parentWhatsapp ? studentData.parentWhatsapp : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Address</span>
                  <p className='text-text-dark'>{studentData.address ? studentData.address : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Date</span>
                  <p className='text-text-dark'>{studentData.date ? studentData.date : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Qualification</span>
                  <p className='text-text-dark'>{studentData.qualification ? studentData.qualification : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>References</span>
                  <p className='text-text-dark'>{studentData.references ? studentData.references : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Reference Name</span>
                  <p className='text-text-dark'>{studentData.referencesName ? studentData.referencesName : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Course</span>
                  <p className='text-text-dark'>{studentData.course ? studentData.course : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Course Duration</span>
                  <p className='text-text-dark'>{studentData.courseDuration ? studentData.courseDuration : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Daily Time</span>
                  <p className='text-text-dark'>{studentData.dailyTime ? studentData.dailyTime : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Course Content</span>
                  <p className='text-text-dark'>{studentData.courseContent ? studentData.courseContent : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Total Fees</span>
                  <p className='text-text-dark'>{studentData.totalFees ? studentData.totalFees : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Joining Date</span>
                  <p className='text-text-dark'>{studentData.joiningDate ? studentData.joiningDate : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Ending Date</span>
                  <p className='text-text-dark'>{studentData.endingDate ? studentData.endingDate : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Job Responsibility</span>
                  <p className='text-text-dark'>{studentData.jobResponse ? studentData.jobResponse : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Installment Details 1</span>
                  <p className='text-text-dark'>{studentData.installmentDetails ? studentData.installmentDetails : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Installment Details 2</span>
                  <p className='text-text-dark'>{studentData.installmentDetails1 ? studentData.installmentDetails1 : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Installment Details 3</span>
                  <p className='text-text-dark'>{studentData.installmentDetails2 ? studentData.installmentDetails2 : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Installment Details 4</span>
                  <p className='text-text-dark'>{studentData.installmentDetails3 ? studentData.installmentDetails3 : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Feculty</span>
                  <p className='text-text-dark'>{studentData.feculty ? studentData.feculty : '-'}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Batch</span>
                  <p className='text-text-dark'>{studentData.batch ? studentData.batch : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Running Topic</span>
                  <p className='text-text-dark'>{studentData.runningTopic ? studentData.runningTopic : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Pc/Laptop</span>
                  <p className='text-text-dark'>{studentData.pc_laptop ? studentData.pc_laptop : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Pc No</span>
                  <p className='text-text-dark'>{studentData.pcNo ? studentData.pcNo : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Laptop Compulsory</span>
                  <p className='text-text-dark'>{studentData.laptopCompulsory ? studentData.laptopCompulsory : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Extra Notes</span>
                  <p className='text-text-dark'>{studentData.extraNote ? studentData.extraNote : "-"}</p>
                </div>
                <div>
                  <span className='text-xs sm:text-sm lg:text-md text-muted'>Reception Notes</span>
                  <p className='text-text-dark'>{studentData.receptionNotes ? studentData.receptionNotes : "-"}</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white' onClick={() => handleClose()}>Close</button>
            </Modal.Footer>
          </>}
      </Modal>
    </>
  )
}

export default ViewStudent
