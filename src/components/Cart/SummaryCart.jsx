import React, { useEffect, useState } from 'react'
import './SummaryCart.css'
import useEcomStore from '../../store/ecom_store'
import { Link, useNavigate } from 'react-router-dom'
import { listUserCart, saveAddressUser } from '../../api/user'
import { toast } from 'react-toastify'
import { use } from 'react'

const SummaryCart = () => {
    const token = useEcomStore((state) => state.token)
    const [products, setProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        hdlGetUserCart(token)
    }, [])

    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const navigate = useNavigate()

    const hdlGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                // console.log(res)
                setProducts(res.data.products);
                setCartTotal(res.data.cartTotal);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const hadleSaveAddress = () => {
        if (!address) {
            return toast.warning('Please fill address')
        }
        saveAddressUser(token, address)
            .then((res) => {
                toast.success('Add address success!!')
                setAddressSaved(true)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdleToPayment = () => {
        if (!addressSaved) {
            toast.warning("Enter your address")
            return
        } else {
            navigate('/user/payment')
        }
    }

    return (
        <div className='w-3/4 h-full m-auto py-20'>
            <div className='flex justify-center w-full gap-4 h-full'>

                {/* Left */}
                <div className='w-2/4'>
                    <div className='bg-gray-300 p-4 pb-14 border-black shadow-xl rounded-md space-y-4'>
                        <h1 className='text-xl font-semibold'>Address</h1>
                        <textarea onChange={(e)=>{
                            setAddress(e.target.value)
                        }} className='w-full rounded-lg' name="" id="" cols="30"></textarea>
                        <div className='relative'>
                            <button onClick={hadleSaveAddress} className='bg-blue-900 text-white w-1/4 h-10 rounded-lg absolute right-0 hover:bg-white hover:text-blue-950 hover:scale-105 hover:text-xl hover:font-semibold hover:border-blue-950 hover:border-2'>Save</button>
                        </div>

                    </div>
                </div>
                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-300 p-4 border-black shadow-xl rounded-md space-y-4'>
                        <h1 className='text-xl font-semibold '>Summary</h1>
                        {/* Item List */}
                        <div className='h-2/3 bg-slate-200 border shadow-2xl rounded-lg overflow-y-auto pb-4'>
                            {
                                products?.map((item, index) =>
                                    <div key={index} className=' p-4 pb-0 rounded-lg flex justify-between items-center'>
                                        <div className=''>
                                            <p>Title : {item.title}</p>
                                            <p>Count : {item.count}</p>
                                        </div>
                                        <div className='text-red-500 font-medium text-lg'>
                                            <p>฿{item.count * item.price}</p>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <hr />
                        {/* Delivery */}
                        <div className='bg-slate-200 border shadow-2xl rounded-lg'>
                            <div className='p-4 pb-0 '>
                                <div className='flex justify-between text-lg'>
                                    <p>Shipping cost :</p>
                                    <p>5000.00</p>
                                </div>
                                <div className='flex justify-between text-lg'>
                                    <p>Discount value :</p>
                                    <p>60000.00</p>
                                </div>
                            </div>
                            <p className='overflow-hidden text-gray-500 font-semibold'>__________________________________________________________________________________________________________________________</p>
                            <div className='flex justify-between p-4 pt-2'>
                                <p className='text-xl font-bold'>Net Total :</p>
                                <p className='text-xl font-semibold text-red-600'>{cartTotal}</p>
                            </div>
                            <div className='flex text-center justify-center pb-4'>
                                <Link onClick={hdleToPayment} className='bg-red-700 w-1/2 p-2
                             text-white rounded-lg hover:bg-gray-100 hover:text-red-800 hover:text-xl hover:font-semibold hover:scale-105 border-red-800 hover:border-2'>
                                    Proceed to payment
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SummaryCart