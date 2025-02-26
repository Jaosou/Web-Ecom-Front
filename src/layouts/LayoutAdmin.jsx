import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarAdmin from '../components/admin/SideBarAdmin'
import HeaderBarAdmin from '../components/admin/HeaderBarAdmin'

const LayoutAdmin = () => {
    return (
        <div className='flex h-screen'>
            <SideBarAdmin />
            <div className='flex-1 flex flex-col'>
                <HeaderBarAdmin />
                <main className='flex-1 p-6 bg-gray-200 overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin