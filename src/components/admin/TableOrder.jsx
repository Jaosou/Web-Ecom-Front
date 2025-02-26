import React, { useState, useEffect } from 'react'
import { editOrderStatus, getOrderAdmin } from '../../api/admin'
import useEcomStore from '../../store/ecom_store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/Number'
import { dateFormat } from '../../utils/DateFormat'
import { changStatusFormat } from '../../utils/StatusFormat'

const TableOrder = () => {
    const [orders, setOrder] = useState([])
    const token = useEcomStore((state) => state.token)


    //Todo : Working Auto
    useEffect(() => {
        handleGatOrderAdmin(token)
    }, [])

    const handleGatOrderAdmin = (token) => {
        getOrderAdmin(token)
            .then((res) => {
                console.log(res)
                setOrder(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangrOrderStatus = (token, orderId, orderStatus) => {
        editOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Success!!')
                handleGatOrderAdmin(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='bg-white rounded-lg p-4 container mx-auto shadow-lg'>
            <table>
                <thead className='bg-gray-200'>
                    <th>No.</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Update Status</th>
                </thead>
                <tbody>
                    {
                        orders?.map((order, index) => {
                            return (
                                <tr className='border' key={index}>
                                    <td className='text-center'>{order.id}</td>
                                    <td className='text-center'>{order.orderBy.email}</td>
                                    <td className='text-center'>{dateFormat(order.createdAt)}</td>
                                    <td className='text-center w-1/5'>{order.orderBy.address}</td>
                                    <td className='px-2 py-4'>{
                                        order.products?.map((product, index) => {
                                            return (
                                                <li key={index} >
                                                    <span>{product.product.title}</span>
                                                    <span className='ml-4'>{product.count} x {product.price}</span>
                                                </li>
                                            )
                                        })
                                    }</td>
                                    <td className='text-center'>
                                        {numberFormat(order.cartotal)}</td>
                                    <td className='text-center'>
                                        <span className={changStatusFormat(order.orderStatus)}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className='text-center'>
                                        <select value={order.orderStatus} onChange={(e) => handleChangrOrderStatus(token, order.id, e.target.value)} name="" id="">
                                            <option>Not process</option>
                                            <option>Processing</option>
                                            <option>Complete</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableOrder
