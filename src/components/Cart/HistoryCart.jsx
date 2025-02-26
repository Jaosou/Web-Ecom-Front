import React from 'react'
import { getOrders } from '../../api/user';
import { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom_store'
import { dateFormat } from '../../utils/DateFormat';
import { changStatusFormat } from '../../utils/StatusFormat';
import moment from 'moment';

const HistoryCart = () => {
    const status = false;
    const [orders, setOrders] = useState([])
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        handleGetOrders(token)
    }, [])

    const handleGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                console.log(res)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='p-4 pt-28'>
            <h1 className='text-xl font-semibold'>List Order</h1>
            {/* All card */}
            <div className='p-4'>
                {/* Header */}
                {
                    orders?.map((order, index) => {
                        return (
                            <div key={index} className='pb-4'>
                                <div className='p-4 flex justify-between h-20 bg-gray-300 items-end rounded-lg'>
                                    <div>
                                        <p>Order Date</p>
                                        <p className='font-bold'>
                                            {
                                                dateFormat(order.createdAt)
                                            }</p>
                                    </div>
                                    <div className={changStatusFormat(order.orderStatus)}>
                                        {
                                            order.orderStatus
                                        }
                                    </div>

                                    {/*                                     {
                                        status === true
                                            ? <div className='bg-teal-200 w-auto h-auto py-1 px-4 flex items-center justify-center rounded-lg text-teal-700 font-bold'>
                                                Processing
                                            </div>
                                            : <div className='bg-emerald-300 w-auto h-auto py-1 px-4 flex items-center justify-center rounded-lg text-emerald-700 font-bold'>
                                                Complete
                                            </div>
                                    } */}
                                </div>
                                {/* Table */}
                                <div className='w-full mt-4 p-2 bg-gray-300 rounded-lg'>
                                    <table key={index} className='border'>
                                        <thead>
                                            <tr className='border-black border-1'>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>QTY</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order.products?.map((product, index) => {
                                                    return (
                                                        <tr className='text-center border-neutral-900'>
                                                            <td>{product.product.title}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.count}</td>
                                                            <td>{product.count * product.price}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <div>
                                        <div className='text-right text-base font-bold'>
                                            <p>Net Price</p>
                                            <p>{order.cartotal}</p>
                                        </div>
                                    </div>
                                </div>
                                {/*Detail Total */}
                            </div>)
                    })
                }

            </div>
        </div>
    )
}

export default HistoryCart