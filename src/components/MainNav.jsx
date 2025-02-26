import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useEcomStore from '../store/ecom_store'
import { use } from 'react'
import { AlignJustify } from 'lucide-react';
import './mainNav.css'

function MainNav() {

    //JS
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const logOut = useEcomStore((state) => state.logOut)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }

    const navigate = useNavigate()

    const handleLogout = () => {
        logOut()
        navigate('/')
    }

    return (
        <nav className='bg-black absolute z-20 text-white w-full' >
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-24 '>
                    <div className='flex items-center gap-4 w-full'>
                        <Link id='logo' to={'/'} className='text-3xl font-bold flex pl-4 pr-12'>Lo <span className='text-red-500'>Go</span></Link>

                        <div className='flex justify-between items-center w-1/5'>
                            <NavLink className={({ isActive }) =>
                                isActive
                                    ? 'formatMenuNav'
                                    : ''} to={'/'}>
                                Home
                            </NavLink>


                            <NavLink className={({ isActive }) =>
                                isActive
                                    ? 'formatMenuNav'
                                    : ''} to={'/shop'}>
                                Shop
                            </NavLink>

                            <NavLink className={({ isActive }) =>
                                isActive
                                    ? 'formatMenuNav'
                                    : 'px-5 py-2 pr-6 relative text-center'} to={'/cart'} >
                                Cart
                                {
                                    carts && carts.length > 0
                                        ? <div className="ml-1 bg-red-600 w-6 h-6 rounded-full absolute top-0 right-0">
                                            {carts.length}
                                        </div>
                                        : <div></div>
                                }

                            </NavLink>
                        </div>



                        {/* <NavLink className={({ isActive }) =>
                            isActive
                                ? 'bg-gray-200 px-5 py-2 pr-6 rounded-xl text-gray-800 font-bold text-lg text-center relative'
                                : 'px-5 py-2 pr-6 relative text-center'} to={'/cart'} >
                            Cart
                            {
                                carts && carts.length > 0
                                    ? <div className="ml-1 bg-red-600 w-6 h-6 rounded-full absolute top-0 right-0">
                                        {carts.length}
                                    </div>
                                    : <div></div>
                            }

                        </NavLink> */}
                    </div>
                    {
                        user && user !== 0
                            ? <div className=' flex items-center '>
                                <button onClick={toggleDropDown} className='flex backdrop-blur-sm bg-white/15 items-center w-36 gap-2 hover:bg-gray-300 py-2 px-3 rounded-lg hover:text-black'>
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-business-man-avatars-flat-icons-pack-people-456324.png?f=webp&w=256" className=' h-10 w-10' alt="" srcset="" />
                                    <AlignJustify className='ml-4' />
                                </button>
                                {
                                    isOpen && (
                                        <div className='bg-gray-300 absolute mt-2 top-16 text-black w-36 z-50'>
                                            <Link to={'/user/history'} className=' block px-2 py-2'>
                                                History
                                            </Link>
                                            <hr />
                                            <button onClick={handleLogout} className=' block px-2 py-2'>
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            : <div className='flex items-center pr-6 '>
                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? 'formatMenuNav'
                                        : 'px-5 py-2 pr-12 relative text-center'} to={'register'}>Register</NavLink>
                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? 'formatMenuNav'
                                        : 'px-5 py-2 pr-6 relative text-center'} to={'login'}>Login</NavLink>
                            </div>
                    }


                </div>
            </div>
        </nav>

    )
}

export default MainNav