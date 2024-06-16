import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/Store';

const UpdateStudentDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const { authorizationToken, courseData, api } = useAuth();
    const [inputError, setInputError] = useState("");

    const getSingleStudent = async () => {
        try {
            const response = await fetch(`${api}/singleStudent/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStudent(data)
            }
        } catch (error) {
            console.log("Error From Fetching One Student : ", error);
        }
    }

    const [job, setJob] = useState("");
    const [pcLaptop, setPcLaptop] = useState(student.pcLaptop);
    const [laptopCompulsory, setlaptopCompulsory] = useState(student.laptopCompulsory);

    useEffect(() => {
        getSingleStudent();
    }, []);

    const handleInput = (e) => {
        var { name, value } = e.target;
        setStudent({
            ...student, [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/updateStudent/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ ...student, jobResponse: job, pc_laptop: pcLaptop, laptopCompulsory: laptopCompulsory })
            });

            if (response.ok) {
                toast.success("Student Details Updated Successfully");
                navigate("/view-student");
            } else {
                toast.error("Error In Updating Student Details")
            }
        } catch (error) {
            console.log("Error From Updating Students Details :", error);
        }
    }

    return (
        <>
            <div className='h-16 flex justify-between items-center py-3 mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Update Student</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / Update Student</p>
                </div>
            </div>
            <Container>
                <div className="box">
                    <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Update Student Information</h1>
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <Tabs
                            defaultActiveKey="home"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="home" title="Student Information">
                                <Row>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='surname'>Surname</label>
                                        <input type="text" name='surname' id='surname' className="border-[1px] border-gray-500 p-1" value={student.surname} onChange={handleInput} />
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='studentname'>Student name</label>
                                        <input type="text" name='studentname' id='studentname' className="border-[1px] border-gray-500 p-1" value={student.studentname} onChange={handleInput} />
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='fathername'>Father name</label>
                                        <input type="text" name='fathername' id='fathername' className="border-[1px] border-gray-500 p-1" value={student.fathername} onChange={handleInput} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3} md={6} sm={12}>
                                        <label htmlFor='studentMobile'>Student Contact No.</label>
                                        <input type="text" name='studentMobile' id='studentMobile' className="border-[1px] border-gray-500 p-1" value={student.studentMobile} onChange={handleInput} />
                                    </Col>
                                    <Col lg={3} md={6} sm={12}>
                                        <label htmlFor='studentWhatsapp'>Whatsapp No.</label>
                                        <input type="text" name='studentWhatsapp' id='studentWhatsapp' className="border-[1px] border-gray-500 p-1" value={student.studentWhatsapp} onChange={handleInput} />
                                    </Col>
                                    <Col lg={3} md={6} sm={12}>
                                        <label htmlFor='parentMobile'>Parent Contant No.</label>
                                        <input type="text" name='parentMobile' id='parentMobile' className="border-[1px] border-gray-500 p-1" value={student.parentMobile} onChange={handleInput} />
                                    </Col>
                                    <Col lg={3} md={6} sm={12}>
                                        <label htmlFor='parentWhatsapp'>Whatsapp No.</label>
                                        <input type="text" name='parentWhatsapp' id='parentWhatsapp' className="border-[1px] border-gray-500 p-1" value={student.parentWhatsapp} onChange={handleInput} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} className='d-grid'>
                                        <label htmlFor='address'>Address</label>
                                        <textarea cols="30" name='address' id='address' rows="3" value={student.address} onChange={handleInput}></textarea>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="profile" title="Course Information">
                                <Row>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='course'>Course</label>
                                        <select name='course' id='course' value={student.course} onChange={handleInput}>
                                            <option value="" disabled>Select Course</option>
                                            {
                                                courseData.map((val, ind) => {
                                                    return (
                                                        <option value={val.course} key={ind}>{val.course}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='courseDuration'>Course Duration</label>
                                        <input type="text" name='courseDuration' id='courseDuration' className="border-[1px] border-gray-500 p-1" value={student.courseDuration} onChange={handleInput} />
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='dailyTime'>Daily Time</label>
                                        <input type="text" name='dailyTime' id='dailyTime' className="border-[1px] border-gray-500 p-1" value={student.courseDuration} onChange={handleInput} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} sm={12} className='d-grid'>
                                        <label htmlFor='courseContent'>Course Contents</label>
                                        <textarea name="courseContent" id="courseContent" cols="30" rows="3" value={student.courseContent} onChange={handleInput}></textarea>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={6} sm={12}>
                                        <label htmlFor='endingDate'>Ending Date</label>
                                        <input type="date" name="endingDate" id="endingDate" value={student.endingDate} onChange={handleInput} />
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                        <label htmlFor='jobResponse'>Job Responsibility</label>
                                        <div className='flex'>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="jobResponse" id="jobResponse" value="Yes" onChange={() => setJob("Yes")} checked={job === "No"} /> Yes
                                            </div>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="jobResponse" id="jobResponse" value="No" onChange={() => setJob("No")} checked={job === "No"} /> no
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <label htmlFor='installmentDetails'>Installment Details</label>
                                        <input type="text" name='installmentDetails' placeholder='installment 1' id='installmentDetails' className="border-[1px] border-gray-500 p-1" value={student.installmentDetails} onChange={handleInput} />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <label htmlFor='installmentDetails1'></label>
                                        <input type="text" name='installmentDetails1' placeholder='installment 2' id='installmentDetails1' className="border-[1px] border-gray-500 p-1" value={student.installmentDetails1} onChange={handleInput} />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <label htmlFor='installmentDetails2'></label>
                                        <input type="text" name='installmentDetails2' placeholder='installment 3' id='installmentDetails2' className="border-[1px] border-gray-500 p-1" value={student.installmentDetails2} onChange={handleInput} />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <label htmlFor='installmentDetails3'></label>
                                        <input type="text" name='installmentDetails3' placeholder='installment 4' id='installmentDetails3' className="border-[1px] border-gray-500 p-1" value={student.installmentDetails3} onChange={handleInput} />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="longer-tab" title="Faculty Information">
                                <Row>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='feculty'>Select Faculty</label>
                                        <select name='feculty' id='feculty' value={student.feculty} onChange={handleInput} >
                                            <option disabled value={""}>Select Faculty</option>
                                            <option value={"Feculty 1"}>Feculty 1</option>
                                            <option value={"Feculty 2"}>Feculty 2</option>
                                        </select>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='batch'>Select Batch</label>
                                        <select name='batch' id='batch' value={student.batch} onChange={handleInput} >
                                            <option value={""} disabled>Select Batch</option>
                                            <option value={"8:00 to 10:00"}>8:00 To 10:00</option>
                                            <option value={"10:00 to 12:00"}>10:00 To 12:00</option>
                                            <option value={"14:00 to 16:00"}>14:00 To 16:00</option>
                                            <option value={"16:00 to 18:00"}>16:00 to 18:00</option>
                                            <option value={"18:00 to 20:00"}>18:00 to 20:00</option>
                                        </select>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='runningTopic'>Running Topic</label>
                                        <input type="text" name='runningTopic' id='runningTopic' className="border-[1px] border-gray-500 p-1" value={student.runningTopic} onChange={handleInput} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='pc_laptop'>PC/Laptop</label>
                                        <div className='d-flex'>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="pc_laptop" id="pc_laptop" value="Yes" onChange={() => setPcLaptop("Yes")} checked={pcLaptop === "No"} /> Yes
                                            </div>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="pc_laptop" id="pc_laptop" value="No" onChange={() => setPcLaptop("No")} checked={pcLaptop === "No"} /> no
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='pcNo'>PC No</label>
                                        <select name='pcNo' id='pcNo' value={student.pcNo} onChange={handleInput}>
                                            <option value={""} disabled>Select PC</option>
                                            <option value={"PC 1"}>PC 1</option>
                                            <option value={"PC 2"}>PC 2</option>
                                            <option value={"PC 3"}>PC 3</option>
                                            <option value={"PC 4"}>PC 4</option>
                                            <option value={"PC 5"}>PC 5</option>
                                            <option value={"PC 6"}>PC 6</option>
                                            <option value={"PC 7"}>PC 7</option>
                                            <option value={"PC 8"}>PC 8</option>
                                            <option value={"PC 9"}>PC 9</option>
                                            <option value={"PC 10"}>PC 10</option>
                                        </select>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <label htmlFor='laptopCompulsory'>Laptop Compalsory</label>
                                        <div className='d-flex'>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="laptopCompulsory" id="laptopCompulsory" value="Yes" onChange={() => setlaptopCompulsory("Yes")} checked={laptopCompulsory === "No"} /> Yes
                                            </div>
                                            <div className='d-flex align-items-center mx-2' style={{ height: '30px' }}>
                                                <input type="radio" name="laptopCompulsory" id="laptopCompulsory" value="No" onChange={() => setlaptopCompulsory("No")} checked={laptopCompulsory === "No"} /> no
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} sm={12} className='d-grid'>
                                        <label htmlFor='extraNote'>Extra Note</label>
                                        <textarea name="extraNote" id="extraNote" cols="30" rows="3" value={student.extraNote} onChange={handleInput}></textarea>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} sm={12} className='d-grid'>
                                        <label htmlFor='receptionNote'>Reception Note</label>
                                        <textarea name="receptionNote" id="receptionNote" cols="30" rows="3" value={student.receptionNote} onChange={handleInput}></textarea>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <button className='btn-1'>Submit</button>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default UpdateStudentDetails
