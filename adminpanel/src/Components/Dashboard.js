import React from 'react'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {

  const card = [
    {
      id: 1,
      bgColor: "primary"
    },
    {
      id: 2,
      bgColor: "success"
    },
    {
      id: 3,
      bgColor: "warning"
    },
    {
      id: 4,
      bgColor: "danger"
    },
  ]
  return (
    <>
      <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Dashboard</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-purple-500'>Home</NavLink> / Dashboard</p>
        </div>
      </div>
      <section className="text-gray-600 body-font w-full">
        <div className="flex flex-wrap">
          {
            card.map((val, ind) => {
              return (
                <div className="md:w-1/4 sm:w-1/3 w-full text-white p-1" key={val.id}>
                  <div>
                    <div className={`bg-${val.bgColor} px-2 py-4 rounded-md`}>
                      <h2 className='text-4xl text-white'>150</h2>
                      <p className='text-white'>New Orders</p>
                    </div>
                    <hr className='text-gray-500' />
                    <div className={`bg-${val.bgColor} text-center p-2 rounded-md`}>More Info</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Dashboard
