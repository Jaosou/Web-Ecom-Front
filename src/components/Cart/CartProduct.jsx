import React from 'react'
import { MdChecklist } from "react-icons/md";
import ListCart from './ListCart';
import useEcomStore from '../../store/ecom_store';
import { Link } from 'react-router-dom';
import './CartProduct.css'
import CartProductData from './CartProductData';

export const CartProduct = () => {

    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const carts = useEcomStore((state) => state.carts)
    
    return (
        <div className='w-4/5 h-screen overflow-x-hidden' >
            <div className='bg-gray-300 w-full p-5 rounded-lg'>
                {/* Top */}
                <div className='flex items-center text-xl pb-4 font-semibold'>
                    <MdChecklist className='mr-4' />
                    <p>List Cart {carts.length}</p>
                </div>
                {/* Grid */}
                <div className='grid lg:grid-cols-4 lowScreen'>

                    {/* List Product */}
                    <div className='col-span-3 mr-4'>
                        <ListCart />
                    </div>

                    {/* Total Price */}
                    {
                        carts.length <= 2
                            ? <div className='lg:h-auto py-4 rounded-lg bg-white px-4 pt-4 lowBar'>
                                <CartProductData />
                            </div>
                            :<div className='lg:h-72 py-4 rounded-lg bg-white px-4 pt-4 lowBar'>
                            <CartProductData />
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
