import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidenav from "./Components/Sidenav";
import Topnav from "./Components/Topnav";
import Dashboard from "./Components/Dashboard";
import AddUser from "./Components/AddUser";
import ViewUser from "./Components/ViewUser";
import AddCourse from "./Components/AddCourse";
import ViewCourse from "./Components/ViewCourse";
import AddContents from './Components/AddContents';
import ViewContents from './Components/ViewContents';
import AddStudent from './Components/AddStudent';
import ViewStudent from './Components/ViewStudent';
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import { useAuth } from "./auth/Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateStudentDetails from "./Components/UpdateStudentDetails";

function App() {

  const [expanded, setExpanded] = useState(false);

  const { isLoggedIn } = useAuth();

  return (
    <>
      {/*<Routes>
        <Route path="/login" element={<Login />} />
      </Routes>*/}
      {isLoggedIn ?
        <>
          <div className="flex">
            <Sidenav expanded={expanded} setExpanded={setExpanded} />
            <div className="h-screen overflow-y-auto overflow-x-hidden" style={{ width: expanded ? `calc(100% - 15rem)` : `calc(100% - 3rem)` }}>
              <Topnav expanded={expanded} setExpanded={setExpanded} />
              <div className="px-3">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route path="/view-user" element={<ViewUser />} />
                  <Route path="/add-course" element={<AddCourse />} />
                  <Route path="/view-course" element={<ViewCourse />} />
                  <Route path="/add-contents" element={<AddContents />} />
                  <Route path="/view-contents" element={<ViewContents />} />
                  <Route path="/add-student" element={<AddStudent expanded={expanded} />} />
                  <Route path="/view-student" element={<ViewStudent />} />
                  <Route path="/updateStudent/:id" element={<UpdateStudentDetails/>} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"/>
        </> : <Login />}
    </>
  );
}

export default App;
