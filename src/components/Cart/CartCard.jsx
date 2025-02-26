import React from 'react'
import { FaTrash, FaMinus } from "react-icons/fa";
import useEcomStore from '../../store/ecom_store';
import { use } from 'react';
import { TiPlus } from "react-icons/ti";
import './CartCard.css'
import { Link } from 'react-router-dom'

const CartCard = () => {

    const carts = useEcomStore((state) => state.carts)

    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveCart = useEcomStore((state) => state.actionRemoveCart)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    return (
        <div className='backdrop-blur bg-gray-600/30 rounded-lg p-4 overflow-y-auto
        '>
            <h1 className='text-2xl font-semibold pb-4'>Card</h1>
            <div className='bg-zinc-300 shadow-2xl p-4 rounded-lg'>
                {/* Cart */}
                <div className='bg-gray-200 pt-6 pl-6 pr-4 pb-4
            rounded-lg'>
                    {
                        carts.map((cart, index) =>
                            <div key={index} className='pb-4'>
                                <div className='bg-slate-200 w-full row-autorounded-lg flex justify-between items-center'>
                                    {/* Left */}
                                    <div className='flex items-center'>
                                        {
                                            cart.images && cart.images.length > 0
                                                //Todo : True
                                                ? <img src={cart.images[0].url} className='h-24 w-24 rounded-md mr-4' alt="" />
                                                //Todo : false
                                                : <div className='h-24 w-24 bg-slate-700 text-white font-bold flex items-center justify-center rounded-md mr-4'>
                                                    Images
                                                </div>
                                        }

                                        <div className=''>
                                            <p className='font-semibold text-xl'>{cart.title}</p>
                                            <p className='text-gray-500'>{cart.description}</p>
                                        </div>

                                    </div>
                                    {/* Right */}
                                    <div className='pr-4 text-xl text-red-600'>
                                        <button onClick={() => actionRemoveCart(cart.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between pt-4 '>
                                    {/* set value left */}
                                    <div className='flex bg-zinc-500 p-1 rounded-lg'>

                                        <button className='optionCount' onClick={() => actionUpdateQuantity(cart.id, cart.count - 1)}><FaMinus /> </button>

                                        <p className='optionCount bg-white'>{cart.count}</p>

                                        <button className='optionCount mr-0' onClick={() => actionUpdateQuantity(cart.id, cart.count + 1)}><TiPlus /></button>

                                    </div>
                                    {/* right */}
                                    <p>{cart.price*cart.count}</p>
                                </div>
                            </div>
                        )
                    }

                    {/* End Cart */}



                </div>
                <div className='flex justify-between pt-4 pb-4'>
                    <p className='text-xl font-semibold'>Total :</p>
                    <p className='text-xl font-semibold'>{getTotalPrice()}</p>
                </div>
                <Link to='/cart'>
                    <button className='w-full bg-green-500 text-white p-2 rounded-lg flex justify-center items-center hover:bg-blue-400 hover:text-black '>
                        <button className='text-xl font-semibold'>Paypad</button>
                    </button> </Link>
            </div>

        </div>
    )
}

export default CartCard