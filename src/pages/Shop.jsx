import React, { useEffect } from 'react'
import ProductCart from '../components/Cart/ProductCart'
import useEcomStore from '../store/ecom_store'
import SeachCart from '../components/Cart/SeachCart'
import CartCard from '../components/Cart/CartCard'
import './shop.css'



const Shop = () => {

    const getProduct = useEcomStore((item) => item.getProduct)
    const products = useEcomStore((item) => item.products)

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='w-full h-full flex justify-center'>
            <div className=' container flex m-3 w-3/4 justify-center pt-5'>

                {/* Seach bar */}
                <div className='w-1/4 pr-8'>
                    <SeachCart />
                </div>
                {/* Product */}
                <div className='w-1/2 rounded-lg p-4 bg-slate-400 text-white h-3/5 overflow-y-scroll scrollBarStyle '>
                    <p className='text-2xl font-bold'>
                        All Product

                    </p>
                    <div className='flex w-full flex-wrap items-center justify-center md:grid-cols-2 sm:grid-cols-1'>
                        {
                            products.map((product, index) =>
                                <ProductCart key={index} product={product} />
                            )
                        }

                    </div>
                </div>
                {/* Cart */}
                <div className='w-2/5 p-4 h-screen overflow-auto'>
                    <CartCard />
                </div>
            </div>
        </div>

    )
}

export default Shop