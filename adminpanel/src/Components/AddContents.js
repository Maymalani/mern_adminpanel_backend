import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/Store';
import { toast } from 'react-toastify';

const AddContents = () => {

    const courseContentObj = {
        course: "",
        fees: "",
        duration: "",
        courseContents:""
    }

    const { authorizationToken, courseWoContent, getCourseWoContent ,updateContentStatus} = useAuth();
    const [courseContent, setCourseContent] = useState(courseContentObj);
    const [inputError, setInputError] = useState("");

    const navigate = useNavigate();
    const handleInput = e => {
        const { name, value } = e.target;
        setCourseContent({
            ...courseContent, [name]: value
        });
    };

    // const updateContentStatus = async (course) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/updateCourseContentStatus/${course}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: authorizationToken
    //             },
    //             body: JSON.stringify({ contentStatus: "1" })
    //         });
    //     } catch (error) {
    //         console.log("Error from updating content status : ", error);
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/addCourseContent/${courseContent.course}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(courseContent)
            });

            var data = await response.json();

            if (response.ok) {
                updateContentStatus(courseContent.course,"1");
                toast.success("Course Content Added Successfully");
                setCourseContent(courseContentObj);
                navigate("/view-contents");
            } else {
                setInputError(data.extraDetails ? data.extraDetails : data.message)
            }
        } catch (error) {
            console.log("Error from adding course content : ", error);
        }
    };

    useEffect(() => {
        getCourseWoContent();
    },[])

    return (
        <>
            <div className='h-16 flex justify-between items-center py-3 mt-16 '>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Course Content</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / Add Course Content</p>
                </div>
            </div>
            <section>
                <div className='container'>
                    <div className='grid place-items-center'>
                        <form className="flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
                            <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Add Course Content</h1>
                            <select
                                className="border-[1px] border-gray-300 rounded-md p-2 pr-3 mb-3 outline-none"
                                name='course'
                                value={courseContent.course}
                                onChange={handleInput}
                            >
                                <option value={""} disabled>Select Course</option>
                                {
                                    courseWoContent.map((val, ind) => {
                                        return (
                                            <option value={val.course} key={ind}>{val.course}</option>
                                        )
                                    })
                                }
                            </select>
                            <input
                                className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
                                placeholder='Contents'
                                type="text"
                                name='courseContents'
                                value={courseContent.courseContents}
                                onChange={handleInput}
                            />
                            <input
                                className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
                                placeholder='Fees'
                                type="text"
                                name='fees'
                                value={courseContent.fees}
                                onChange={handleInput}
                            />
                            <input
                                className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
                                placeholder='Duration'
                                type="text"
                                name='duration'
                                value={courseContent.duration}
                                onChange={handleInput}
                            />
                            <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
                            <input type="submit" value="Add Content" className={`mx-auto w-1/2 mb-3  bg-purple-500  text-white rounded-md py-2`} />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddContents
