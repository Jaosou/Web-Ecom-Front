import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom_store';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import StarBackground from '../../utils/starBackground';

const Login = () => {

    const navigate = useNavigate()
    const carts = useEcomStore((state) => state.carts)
    const actionLogin = useEcomStore((state) => state.actionLogin)
    const user = useEcomStore((state) => state.user)
    const [isBack, setIsBack] = useState(false)


    //Js code
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSummit = async (event) => {
        event.preventDefault()
        //Todo : Send to backend

        try {
            const res = await actionLogin(form)
            const role = res.data.Payload.role
            console.log(res)
            roleRedirect(role)
            toast.success('Welcome Back')
        } catch (err) {
            const errMsg = err.response?.data?.message
            toast.error(errMsg)
            console.log(err)
        }

        /* try {
            const res = await axios.post('https://web-ecom-api.vercel.app/api/login',form)

            toast.success(res.data)
            console.log(res)
        } catch (err) {
            const errMsg = err.response?.data?.message
            toast.error(errMsg)
            console.log(err)
        } */

    }

    const roleRedirect = (role) => {
        if (role == 'Admin') {
            navigate('/admin')
        } else {
            navigate('/')
        }
    }

    return (
        <div className='relative'>
            <div className='absolute h-full'><StarBackground /> </div>
            <div className='min-h-[90vh] flex justify-center items-center'>
                <div className='containner mx-auto w-full'>
                    <div className='flex justify-center w-full'>
                        <div className='w-1/3 h-1/2 relative'>
                            <div className='w-full h-full relative bg-gray-200 p-4 rounded-l-2xl shadow-lg backdrop-blur-sm bg-white/10'>
                                <div className='py-5'>
                                    <h2 className='text-2xl text-white font-bold py-5'>
                                        Login
                                    </h2>
                                    <form className='px-6' action="" onSubmit={handleSummit}>

                                        <input
                                            placeholder='Email'
                                            name='email'
                                            onChange={handleOnChange}
                                            type="email"
                                            className='pl-2 my-2 w-full rounded-lg h-12 focus:outline-none focus:ring-2 focus:ring-red-500
                                            focus:border-transparent' />
                                        <br />

                                        <input
                                            placeholder='password'
                                            onChange={handleOnChange}
                                            name='password'
                                            type="text"
                                            className='pl-2 my-2 w-full rounded-lg h-12 focus:outline-none focus:ring-2 focus:ring-red-500
                                            focus:border-transparent' />
                                        <br />
                                        <div className='flex justify-between py-2 text-base font-normal'>
                                            <NavLink to={'/register'} className={({ isActive }) =>
                                                isActive
                                                    ? setIsBack(!isBack)
                                                    : 'text-white'
                                            }>Create New Account</NavLink>
                                            <Link className='text-white text-sm'>Forget Password ?</Link>
                                        </div>
                                        <div className='text-center pt-4'>
                                            <button className='w-full py-3 rounded-xl bg-gradient-to-r from-black from-10% via-zinc-900 via-20% to-gray-600 text-white text-xl font-semibold'>Login</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="backdrop-blur-sm bg-[url('/images/star.png')] w-1/3 flex flex-col px-8 justify-center items-center text-center text-white rounded-r-xl border-r-2 border-y-2 border-white ">
                            <h2 className='text-2xl text-white font-semibold'>
                                Welcome User!
                            </h2>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto incidunt ratione enim optio cum, reprehenderit perferendis ipsa voluptatibus officiis a veritatis tempora maxime non, assumenda ipsam possimus delectus praesentium.
                            </div>
                        </div>



                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login