import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import useEcomStore from '../../store/ecom_store';
import { motion } from "framer-motion"

const ProductCart = ({ product }) => {
    const actionAddToCart = useEcomStore((state) => state.actionAddToCart)
    return (
        <motion.div
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{
                opacity: 1, scale: 1
            }}
            transition={{ duration: 0.5 }}
        >
            <div>
                {
                    product.quantity > 1 &&
                    <div className='m-2 mt-4 p-2 items-center justify-center rounded-lg border h-auto w-56  bg-white text-black shadow-2xl'>

                        {
                            product.images && product.images.length > 0
                                ? <img className='w-full h-40 rounded-lg shadow-lg mb-2' src={product.images[0].url} />
                                : <div className='w-full h-40 flex justify-center items-center bg-slate-700 text-white font-bold rounded-lg mb-4'>
                                    Images
                                </div>
                        }


                        <div className='text-xl font-bold pb-1 truncate'>
                            {product.title}
                        </div>


                        <div className='text-gray-500 text-base pb-2 overflow-hidden'>
                            {product.description}
                        </div>


                        <div className='pb-2 font-bold flex justify-between'>
                            <span className='font-normal'>Balance {product.quantity} pi.</span>
                            $ {product.price}
                        </div>


                        <div className='flex justify-between text-xl w-full bg-black rounded-lg text-white p-3 hover:bg-gray-300 hover:text-black hover:font-bold hover:scale-105'
                            onClick={() => actionAddToCart(product)} >
                            <button className='mr-4'><FaCartPlus /></button>
                            <span>Add To Cart</span>

                        </div>

                    </div>
                }


            </div>
        </motion.div>
    )
}

export default ProductCart