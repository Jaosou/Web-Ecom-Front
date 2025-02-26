import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";


const FormatFooter = () => {
    const navigate = useNavigate()  // React hook for navigation

    const hdleOnClick = () => {
        navigate('/', { replace: true })  //Navigate to the home page
    }

    return (
        <footer className='bg-black h-80 w-full text-white flex justify-center items-center flex-col'>
            <div className='w-1/2 h-4/5 flex items-center'>
                <div className='h-4/5 w-full font-bold flex items-start justify-between'>
                    <div className='h-full flex items-center justify-between w-1/4'>
                        <div>
                            <Link onClick={hdleOnClick} className='text-3xl font-bold pr-12'>
                                <span >Lo</span>
                                <span className='text-red-500'>Go</span>
                            </Link>
                            <p className='font-normal'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, recusandae reprehenderit. Facilis fuga blanditiis, laborum
                            </p>
                        </div>
                    </div>
                    <div className='flex w-1/2 h-full'>
                        <div className='flex items-center justify-center h-full w-[50%]'>
                            <div>
                                <p className='text-2xl font-bold pb-4'>
                                    About Me
                                </p>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Connevt with me
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    About me
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Rule
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                        <div className='flex items-center justify-center h-full w-[50%]'>
                            <div>
                                <p className='text-2xl font-bold pb-4'>
                                    Sevices
                                </p>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Shipping
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Waranty
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Cancelled Order
                                </Link>
                                <Link className='text-base font-normal pb-2 text-gray-300'>
                                    Returning products
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-center h-full w-[25%]'>
                        <div>
                            <p className='text-2xl font-bold pb-4'>
                                Contract
                            </p>
                            <p className='text-base font-normal pb-2 text-gray-300'>
                                135 Meaug Bkk. 11030
                            </p>
                            <p className='text-base font-normal pb-2 text-gray-300'>
                                Phone Number : 089-482-4868
                            </p>
                            <p className='text-base font-normal pb-2 text-gray-300'>
                                Email :test@test.com
                            </p>
                            <div className='font-normal flex justify-between pb-2 text-gray-300 pt-5'>
                                <a className='' href="">
                                    <FaFacebookF className='text-2xl' />
                                </a>
                                <a className='' href="">
                                    <MdOutlineAlternateEmail className='text-2xl' />
                                </a>
                                <a className='' href="">
                                    <FaTiktok className='text-2xl' />
                                </a>
                                <a className='' href="">
                                    <FaYoutube className='text-2xl' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='h-[10%] w-1/2 flex items-end justify-between'>
                <p>Lorem ipsum, dolor sit amet consectetur </p>
                <p className='text-end'>Lorem ipsum / dolor sit amet /consectetur</p>
            </div>


        </footer >
    )
}

export default FormatFooter
