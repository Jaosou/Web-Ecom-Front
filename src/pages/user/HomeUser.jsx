import React from 'react'
import useEcomStore from '../../store/ecom_store'

const HomeUser = () => {
    const carts = useEcomStore((state)=>state.carts)
    return (
        <div>HomeUser</div>
    )
}

export default HomeUser