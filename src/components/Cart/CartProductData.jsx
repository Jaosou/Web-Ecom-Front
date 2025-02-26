import React from 'react'
import useEcomStore from '../../store/ecom_store'
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user'
import { toast } from 'react-toastify'


const CartProductData = () => {
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                toast.success('Finish Paid!!', {
                    position: 'top-center'
                })
                navigate('/checkout')
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                toast.warning(err.response.data.message)
            })
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Total Price
            </h1>

            <div className='flex pt-2 justify-between pb-4'>
                <p className='text-md font-semibold'>
                    Price :
                </p>
                <p className='text-xl font-semibold'>
                    ฿ {getTotalPrice()}
                </p>
            </div>

            {
                user && user !== 0
                    ? <Link to={'/user/payment'}>
                        <button
                        disabled={
                            cart.length < 1
                        }
                            onClick={handleSaveCart} className='flex justify-center items-center w-full h-20 bg-slate-900 text-white text-xl font-semibold rounded-lg mb-4'>
                            Confirm Pay
                        </button>
                    </Link>
                    : <Link to={'/login'}><button className='flex justify-center items-center w-full h-20 bg-slate-900 text-white text-xl font-semibold rounded-lg mb-4'>
                        Login
                    </button>
                    </Link>
            }


            <Link to={'/shop'}>
                <button className='flex justify-center items-center w-full h-20 border-2 border-black text-xl font-semibold rounded-lg'>
                    Edit Cart
                </button>
            </Link>
        </div>
    )
}

export default CartProductData