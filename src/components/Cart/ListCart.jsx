import React from 'react'
import useEcomStore from '../../store/ecom_store'


const ListCart = () => {
    const carts = useEcomStore((state) => state.carts)
    
    return (
        <div>
            {
                carts.map((item, index) =>
                    <div key={index} className='flex p-4 rounded-lg bg-white justify-between items-center m-0 mb-4'>
                        <div className='flex items-center'>
                            {/* image */}
                            {
                                item.images && item.images.length > 0
                                    ? <img className='w-20 h-20 rounded-md' src={item.images[0].url} alt="" />
                                    : <div className='bg-slate-400 h-20 w-20 rounded-md flex items-center justify-center text-sm font-medium '>
                                        No image
                                    </div>
                            }


                            {/* Title & Desc */}
                            <div className='pl-4'>
                                <h2 className='text-xl font-medium'>{item.title}</h2>
                                <p>Price : {item.price} x {item.count}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-lg font-semibold'>฿ {item.price * item.count}</p>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ListCart