import React from 'react'
import ContentCarosul from '../components/Home/ContentCarosul'
import BestSeller from '../components/Home/BestSeller'
import NewProduct from '../components/Home/NewProduct'

const Home = () => {
    return (
        <div className='flex justify-center '>
            <div className='container w-3/4 scroll-m-0 m-3'>

                <ContentCarosul />

                <div className='bg-gray-200 my-4 w-9/10 rounded-2xl'>
                    <p className='text-xl font-bold text-center pt-6'>
                        Popular product
                    </p>
                    <BestSeller />
                </div>

                <div className='bg-gray-200 my-4 rounded-2xl'>
                    <p className='text-xl font-bold text-center pt-6'>
                        New product
                    </p>
                    <NewProduct />
                </div>



            </div>
        </div>

    )
}

export default Home