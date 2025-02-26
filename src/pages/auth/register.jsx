import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom_store';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm, } from "react-hook-form"
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'
import './register.css'
import StarBackground from '../../utils/starBackground';


const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email !!' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters !!' }),
    confirmPassword: z.string().min(8).refine((data) => {
        return data.password === data.confirmPassword
    }, { message: 'Password not match !!', path: ['confirmPassword'] })
})

const register = () => {
    const navigate = useNavigate()
    const [passwordScore, setPasswordScore] = useState(0)
    //Todo : React hook form Class 2
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const carts = useEcomStore((state) => state.carts)
    //Js code


    const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const vaildatePassword = (event) => {
        let password = watch().password
        return zxcvbn(password ? password : ' ').score
    }

    useEffect(() => {
        setPasswordScore(vaildatePassword())
    }, [watch().password])

    // const hdleSummit = async (event) => {
    //     event.preventDefault()
    //     if (form.password !== form.confirmPassword) {
    //         return alert('Password is not match!!')
    //     }
    //     console.log(form)

    //     //Todo : Send to backend
    //     try {
    //         const res = await axios.post('https://web-ecom-api.vercel.app/api/register', form)

    //         toast.success(res.data)
    //         console.log(res)
    //     } catch (err) {
    //         const errMsg = err.response?.data?.message
    //         toast.error(errMsg)
    //         console.log(err)
    //     }
    // }

    const hdleSummit = async (data) => {
        //Todo : Check password strength
        const passwordStrength = zxcvbn(data.password).score
        if (passwordStrength < 3) {
            console.log(passwordStrength)
            return toast.error('Password is weak')
        }
        try {
            const res = await axios.post('https://web-ecom-api.vercel.app/api/register', data)
            toast.success(res.data)
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    // const tam = Array.from('tam')
    // console.log(tam)

    return (
        <div className='relative'>
            <div className='absolute h-full'><StarBackground /> </div>
            <div className='min-h-[90vh] flex justify-center items-center'>
                <div className='containner mx-auto w-full'>
                    <div className='flex justify-center w-full'>
                        <div className="backdrop-blur-sm bg-[url('/images/star.png')] w-1/3 flex flex-col px-8 justify-center items-center text-center text-white rounded-s-xl rounded-l-xl border-l-2 border-y-2 border-white ">
                            <h2 className='text-2xl text-white font-semibold'>
                                Welcome User!
                            </h2>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio architecto incidunt ratione enim optio cum, reprehenderit perferendis ipsa voluptatibus officiis a veritatis tempora maxime non, assumenda ipsam possimus delectus praesentium.
                            </div>
                        </div>
                        <div className='w-1/3 h-1/2 relative'>
                            <div className='w-full h-full relative bg-gray-200 p-4 rounded-r-2xl shadow-lg backdrop-blur-sm bg-white/10'>
                                <div className='w-full'>

                                    <h2 className='text-2xl text-white font-bold py-5'>
                                        Sign In
                                    </h2>

                                    <div>

                                        <form className='px-6' action="" onSubmit={handleSubmit(hdleSummit)}>


                                            <div className=' w-full'>
                                                <input placeholder='Email Address' className=' pl-2 my-2 w-full rounded-lg h-12 focus:outline-none focus:ring-2 focus:ring-red-500
                                                focus:border-transparent' {...register("email")} />
                                                {
                                                    errors.email && <p className='formatErrorUser'>{errors.email.message}</p>
                                                }
                                            </div>

                                            <div className=' w-full'>
                                                <input placeholder='Password' className=' pl-2 my-2 w-full rounded-lg h-12 focus:outline-none focus:ring-2 focus:ring-red-500
                                                focus:border-transparent' {...register("password")} />
                                                {
                                                    errors.password && <p className='formatErrorUser'>{errors.password.message}</p>
                                                }
                                                <div className='flex'>
                                                    {
                                                        watch().password?.length > 0 &&
                                                        <div className='flex items-center py-4 w-1/2'>
                                                            <div className='w-full flex '>
                                                                {
                                                                    Array.from(Array(5).keys()).map((item, index) =>
                                                                        <span className='w-full px-[2px]' key={index}>
                                                                            <div className={`h-2 ${passwordScore < 2
                                                                                ? 'bg-red-600 font-bold'
                                                                                : passwordScore < 3
                                                                                    ? 'bg-amber-500'
                                                                                    : 'bg-emerald-400'
                                                                                } rounded-lg`}>
                                                                            </div>
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={
                                                                `text-sm font-bold px-2 ${passwordScore < 2
                                                                    ? 'text-red-600'
                                                                    : passwordScore < 3
                                                                        ? 'text-amber-400'
                                                                        : 'text-emerald-400'
                                                                }`
                                                            }>
                                                                <span className='pr-2'>Password</span>
                                                                {
                                                                    passwordScore < 2
                                                                        ? <span>Weak!</span>
                                                                        : passwordScore < 3 ?
                                                                            'Medium!!'
                                                                            : 'Strong!!!'
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                            <div className=' w-full'>
                                                <input placeholder='Confirm Password' className=' pl-2 my-2 w-full rounded-lg h-12                           focus:outline-none focus:ring-2 focus:ring-red-500
                                                focus:border-transparent' {...register("confirmPassword")} />
                                                {
                                                    errors.confirmPassword && <p className='formatErrorUser'>{errors.confirmPassword.message}</p>
                                                }
                                            </div>{/*  */}

                                            {/* <div className='text-2xl w-full'>
                                <span className='font-semibold text-gray-700 '>Password</span>
                                <br />
                                <input className='my-2 w-full rounded-lg' {...register("password")} />
                                {
                                    errors.password && <p className='text-xl font-bold text-red-700'>{errors.password.message}</p>
                                }

                                {
                                    watch().password?.length > 0 &&
                                    <div className='flex py-4 w-full'>
                                        {
                                            Array.from(Array(5).keys()).map((item, index) =>
                                                <span className='w-full px-[2px]' key={index}>
                                                    <div className={`h-2 ${passwordScore < 2
                                                        ? 'bg-red-200 font-bold'
                                                        : passwordScore < 4
                                                            ? 'bg-amber-300'
                                                            : 'bg-teal-400'
                                                        } rounded-lg`}>
                                                    </div>
                                                </span>
                                            )
                                        }
                                    </div>
                                }
                            </div>

                            <div className='text-2xl w-full'>
                                <span className='font-semibold text-gray-700 '>Confrim Password</span>
                                <br />
                                <input className='my-2 w-full rounded-lg' {...register("confirmPassword")} />
                                {
                                    errors.confirmPassword && <p className='text-xl font-bold text-red-700'>{errors.confirmPassword.message}</p>
                                }
                            </div> */}

                                            <div className='text-center pt-4'>
                                                <button className='w-full py-3 rounded-xl bg-gradient-to-r from-black from-10% via-zinc-900 via-20% to-gray-600 text-white text-xl font-semibold'>Register</button>
                                            </div>
                                            <br />
                                            <div className='flex justify-center text-white text-lg'>
                                                <span>Already have an account? </span>
                                                <Link to='/login' className='text-cyan-400 font-bold pl-2 hover:underline hover:underline-offset-4 ease-linear duration-300'>Login</Link>
                                            </div>
                                            <br />
                                            <NavLink to={'/home'} className='w-full py-3 rounded-xl bg-white flex items-center justify-center text-lg font-medium text-center pt-4 mb-4 '>
                                                <img className='w-9 h-9 mr-2' src="./images/Gglogo.png" alt="" />
                                                <div className=''>Sign In with Google</div>
                                            </NavLink>
                                        </form>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>

            </div >

        </div>

    )
}

export default register