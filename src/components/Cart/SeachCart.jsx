import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom_store'
import { seachFilters } from '../../api/Product'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { IoMdSearch } from "react-icons/io";

const SeachCart = () => {
    const getProduct = useEcomStore((item) => item.getProduct)
    const products = useEcomStore((item) => item.products)


    const getCategory = useEcomStore((item) => item.getCategory)
    const category = useEcomStore((item) => item.categories)


    const seachFilter = useEcomStore((state) => state.seachFilter)

    const [price, setPrice] = useState([0, 100000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])

    const [stateText, setStateText] = useState('')
    //Todo : 1 Seach Text
    useEffect(() => {
        const delay = setTimeout(() => {
            if (stateText) {
                seachFilter({
                    query: stateText
                })
            } else {
                getProduct()
            }
        }, 400)

        return () => clearInterval(delay)
    }, [stateText])


    const [stateCategory, setStateCategory] = useState([])
    //Todo : 2 Seach Category
    const handleCheck = (event) => {
        const inCheck = event.target.value
        const inState = [...stateCategory]
        const findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setStateCategory(inState)


        if (inState.length > 0) {
            seachFilter({ category: inState })
        } else {
            getProduct()
        }
    }

    //Todo : 3 Seach Price
    useEffect(() => {
        seachFilter({ price })
    }, [ok])

    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)

        setTimeout(() => {
            setOk(!ok)
        }, 200)
    }


    return (
        <div className='backdrop-blur-sm bg-black/15 rounded-lg p-4 '>
            <div className='relative items-center'>
                <input onChange={(e) => setStateText(e.target.value)} type="text" className='w-full h-12 rounded-lg pl-2 relative' placeholder='Search Title' />
            </div>
            <hr />
            <div className='py-4'>
                <h1 className='text-lg font-semibold'>Category</h1>
                {category.map((item, index) =>
                    <div className='flex gap-2' key={index}>
                        <input type="checkbox" value={item.id} onChange={handleCheck} />
                        <label htmlFor="">{item.name}</label>
                    </div>
                )}
            </div>
            <hr />
            <div className='pt-4'>
                <h1 className='text-lg font-semibold'>Price</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min: {price[0]}</span>
                        <span>Max: {price[1]}</span>
                    </div>
{/*                     <div className='flex justify-between'>
                        <input defaultValue={0} onChange={handlePrice} className='w-1/3' type="number" />
                        <input defaultValue={100000} onChange={handlePrice} className='w-1/3' type="number" />
                    </div> */}
                    <Slider onChange={handlePrice}
                        range
                        min={0}
                        max={100000}
                        defaultValue={[0, 100000]} />
                </div>
            </div>
        </div>
    )
}

export default SeachCart