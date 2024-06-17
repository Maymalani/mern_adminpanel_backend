import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo512.png'
import profile from '../assets/images.jpg'
import { useAuth } from '../auth/Store'

const Sidenav = ({expanded,setExpanded}) => {

  const [firstTab, setFirstTab] = useState(false);
  const [secondTab, setSecondTab] = useState(false);
  const [thirdTab, setThirdTab] = useState(false);
  const [fourthTab, setFourthTab] = useState(false);

  const { user } = useAuth();

  const liHandle = () => {
    if (!expanded) {
      setExpanded(true);
    }
  }

  const firstTabHandle = () => {
    setFirstTab(!firstTab);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(false);
  }

  const secondTabHandle = () => {
    setFirstTab(false);
    setSecondTab(!secondTab);
    setThirdTab(false);
    setFourthTab(false);
  }

  const thirdTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(!thirdTab);
    setFourthTab(false);
  }

  const fourthTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(!fourthTab);
  }

  return (
    <>
      <aside className={`h-screen ${expanded ? "w-60" : "w-12"} sticky top-0 left-0 overflow-hidden`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="h-16 py-4 px-3 flex justify-between items-center">
            <img src={logo} className={`${expanded ? "w-[40px]" : "hidden"} `} alt="" />
            <h1 className={`text-2xl tracking-wide ${expanded ? "block" : "hidden"}`}>REACT</h1>
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars cursor-pointer"></i>}
            </button>
          </div>
          <hr />
          <div className="h-16 py-4 px-3 flex items-center">
            <img src={profile} className={`${expanded ? "w-[40px]" : "w-[50px]"} rounded-full`} alt="" />
            <h2 className={`text-lg tracking-wide font-semibold px-3 pr-0 ${expanded ? "block" : "hidden"}`}>{`${user.firstname} ${user.lastname}`}</h2>
          </div>
          <hr />
          <ul className={`flex-1 ${expanded ? "px-3" : "px-1"}`} onClick={() => liHandle()}>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-purple-500 hover:text-white`} onClick={() => {
              setFirstTab(false);setSecondTab(false);setThirdTab(false);setFourthTab(false);setExpanded(!expanded);
            }}>
              <NavLink to={"/"} className="w-52 sideLink"><i className="fa-solid pr-2 fa-gauge-high fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Dashboard</span></NavLink>
            </li>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-purple-500 hover:text-white`} onClick={firstTabHandle}>
              <NavLink className="relative w-52 sideLink">
                <i className="fa-solid pr-2 fa-user-tie fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Manage User <i className={`fa-solid fa-angle-${firstTab ? "up" : "down"} absolute left-44 top-1`}></i></span>
              </NavLink>
            </li>
            <ul className={`submenu text-gray-500 font-normal my-1 mt-2 ${firstTab ? "" : "hidden"}`}>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/add-user"}><i className="fa-solid fa-plus pr-2"></i> Add User</NavLink></li>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={'/view-user'}><i className="fa-regular fa-eye pr-2"></i> View User</NavLink></li>
            </ul>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-purple-500 hover:text-white`} onClick={secondTabHandle}>
              <NavLink className="relative w-52 sideLink">
                <i className="fa-solid pr-2 fa-microchip fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Manage Course <i className={`fa-solid fa-angle-${secondTab ? "up" : "down"} absolute left-44 top-1`}></i></span>
              </NavLink>
            </li>
            <ul className={`submenu text-gray-500 font-normal my-1 mt-2 ${secondTab ? "" : "hidden"}`}>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/add-course"}><i className="fa-solid fa-plus pr-2"></i> Add Course</NavLink></li>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/view-course"}><i className="fa-regular fa-eye pr-2"></i> View Course</NavLink></li>
            </ul>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-purple-500 hover:text-white`} onClick={thirdTabHandle}>
              <NavLink className="relative w-52 sideLink">
                <i className="fa-solid pr-2 fa-virus fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Course Contents <i className={`fa-solid fa-angle-${thirdTab ? "up" : "down"} absolute left-44 top-1`}></i></span>
              </NavLink>
            </li>
            <ul className={`submenu text-gray-500 font-normal my-1 mt-2 ${thirdTab ? "" : "hidden"}`}>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/add-contents"}><i className="fa-solid fa-plus pr-2"></i> Add Contents</NavLink></li>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/view-contents"}><i className="fa-regular fa-eye pr-2"></i> View Contents</NavLink></li>
            </ul>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-purple-500 hover:text-white`} onClick={fourthTabHandle}>
              <NavLink className="relative w-52 sideLink">
                <i className="fa-solid pr-2 fa-graduation-cap fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Admissions <i className={`fa-solid fa-angle-${fourthTab ? "up" : "down"} absolute left-44 top-1`}></i></span>
              </NavLink>
            </li>
            <ul className={`submenu text-gray-500 font-normal my-1 mt-2 ${fourthTab ? "" : "hidden"}`}>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/add-student"}><i className="fa-solid fa-plus pr-2"></i> Add Student</NavLink></li>
              <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={"/view-student"}><i className="fa-regular fa-eye pr-2"></i> View Student</NavLink></li>
            </ul>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidenav;