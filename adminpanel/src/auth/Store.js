import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const authorizationToken = token;
    const [user, setUser] = useState("");
    const [courseData, setCourseData] = useState([]);
    const [allStudentData, setAllStudentData] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [courseWoContent, setCourseWoContent] = useState([]);
    const [allCourseContent, setAllCourseContent] = useState([]);
    const api = "https://mern-adminpanel1.onrender.com"

    const storeTokenInLs = (token) => {
        setToken(token);
        return localStorage.setItem('token', token);
    }

    console.log(api);

    const getAllCourse = async () => {
        try {
            const response = await fetch(`${api}/getAllCourse`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCourseData(data);
            }
        } catch (error) {
            console.log("Error from fetching course");
        }
    }

    const getAllStudent = async () => {
        try {
            const response = await fetch(`${api}/getAllStudent`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAllStudentData(data);
                // return tData;
            }
        } catch (error) {
            console.log("Error from fetching all students : ", error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${api}/alluser`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAllUser(data);
            }
        } catch (error) {
            console.log("Error from fetching All User : ", error);
        }
    }

    const getAllCourseContent = async () => {
        try {
            const response = await fetch(`${api}/getAllCourseContent`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json();
            setAllCourseContent(data);
        } catch (error) {
            console.log("Error from fetching all course content : ", error);
        }
    }

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${api}/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.log(`Error from fetch user : ${error}`);
        }
    }

    const getCourseWoContent = async () => {
        try {
            const response = await fetch(`${api}/withoutContentCourse`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCourseWoContent(data);
            }
        } catch (error) {
            console.log("Error from fetching course");
        }
    }

    const updateContentStatus = async (course, status) => {
        try {
            const response = await fetch(`${api}/updateCourseContentStatus/${course}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ contentStatus: status })
            });
        } catch (error) {
            console.log("Error from updating content status : ", error);
        }
    }

    const isLoggedIn = !!token;

    const Logout = () => {
        setToken("");
        return localStorage.removeItem('token');
    }

    useEffect(() => {
        userAuthentication();
        getAllCourse();
        getAllStudent();
        getAllUsers();
        getCourseWoContent();
        getAllCourseContent();
    }, [token]);

    return (
        <AuthContext.Provider value={{api, storeTokenInLs, isLoggedIn, Logout, authorizationToken, user, getAllStudent, getAllCourse, allUser, getAllUsers, courseData, allStudentData, getCourseWoContent, courseWoContent, allCourseContent, getAllCourseContent, updateContentStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}