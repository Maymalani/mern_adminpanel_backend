import React from 'react'
import { NavLink } from 'react-router-dom'

const Topnav = ({ expanded }) => {

    return (
        <>
            <header className={`h-16 px-3 pt-[19px] fixed top-0 right-0 bg-white`} style={{ width: expanded ? `calc(100% - 15rem)` : `calc(100% - 3rem)` }}>
                <div className="flex justify-between items-center">
                    <div>
                        <NavLink to={"/"} className="pr-3 hover:text-purple-500">Home</NavLink>
                    </div>
                    <NavLink to={"/logout"}><i className="fa-solid fa-power-off hover:text-red-600 hover:scale-125" title='LogOut'></i></NavLink>
                </div>
            </header>
            <hr />
        </>
    )
}

export default Topnav
