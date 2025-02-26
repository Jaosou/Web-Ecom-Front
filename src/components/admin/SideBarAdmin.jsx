import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import './SideBarAdmin.css'

const SideBarAdmin = () => {
    return (
        <div className='bg-gray-700 w-64 flex flex-col px-0 
        text-white font-bold h-screen'>

            <div className='h-20 flex items-center justify-center bg-gray-900 mb-3 text-2xl '>
                Admin user
            </div>
            <nav className='flex-1 px-4 space-y-2'>
                <NavLink
                    to={'/admin'}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'iconSideBarActive'
                            : 'iconSideBarDefault'                    }>
                    <RiAdminFill className='mr-auto' />
                    Dashboard
                </NavLink>
                <NavLink
                    to={'manage'}
                    className={({ isActive }) =>
                        isActive
                            ? 'iconSideBarActive'
                            : 'iconSideBarDefault'                    }>
                    <MdManageAccounts className='mr-auto text-2xl' />
                    Manage
                </NavLink>
                <NavLink
                    to={'category'}
                    className={({ isActive }) =>
                        isActive
                            ? 'iconSideBarActive'
                            : 'iconSideBarDefault'
                    }>
                    <TbCategory className='mr-auto text-2xl ' />
                    Category
                </NavLink>
                <NavLink
                    to={'product'}
                    className={({ isActive }) =>
                        isActive
                            ? 'iconSideBarActive'
                            : 'iconSideBarDefault'
                    }>
                    <FaCartShopping className='mr-auto text-2xl' />
                    Product
                </NavLink>
                <NavLink
                    to={'order'}
                    className={({ isActive }) =>
                        isActive
                            ? 'iconSideBarActive'
                            : 'iconSideBarDefault'
                    }>
                    <FaCartShopping className='mr-auto text-2xl' />
                    order
                </NavLink>
            </nav>

            
            <div className=' items-center justify-center'>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white  flex items-center px-4 py-4'
                            : 'text-gray-2F00 bg-gray-600 rounded-2xl  hover:bg-gray-700 flex items-center px-4 py-4'
                    }>
                    <RiLogoutBoxFill className='mr-auto text-2xl' />
                    Logout
                </NavLink>
            </div>

        </div>
    )
}

export default SideBarAdmin