import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'
import StarBackground from '../utils/starBackground'
import FormatFooter from './footFormat/FooterFormat'

const layout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='w-full fixed z-20'>
                <MainNav />
            </div>
            <div>
                <main className='mx-auto pt-24'>
                    <Outlet />
                </main>
            </div>
            <div className='h-full flex items-end'>
                <FormatFooter />
            </div>


        </div>
    )
}

export default layout