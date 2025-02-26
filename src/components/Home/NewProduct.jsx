import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCart from '../Cart/ProductCart'
import ShowProduct from '../../utils/ShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {

    const [data, setdata] = useState([])

    useEffect(() => {
        hdleLoadData()
    }, [])

    const hdleLoadData = (sort, order, limit) => {
        listProductBy('updatedAt', 'desc', 8)
            .then((res) => {
                let dataCheck = []
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].quantity > 0
                    ? dataCheck.push(res.data[i])
                    : ''
                }
                setdata(dataCheck)
            })
            .catch((err) => console.log(err))/*  */
    }

    return (
        <div className='mx-4'>
            <ShowProduct>
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <ProductCart key={index} product={item} />
                        </SwiperSlide>
                    )
                }
            </ShowProduct>
        </div>

    )
}

export default NewProduct