import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom_store'
import { createProduct, getProducts, readProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import './FormProduct.css'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'
const initialState = {
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [formValue, setFormValue] = useState(initialState)

    useEffect(() => {
        //Code
        getCategory(token)
        fetchProduct(token, id, formValue)
    }, [])

    const fetchProduct = async (token, id, formValue) => {
        try {
            const res = await readProduct(token, id, formValue)
            console.log('res from back', res)
            setFormValue(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    const handleSummit = async (event) => {
        event.preventDefault()
        try {
            const res = await updateProduct(token,id,formValue)
            console.log(res)
            toast.success(`Edit data: ${res.data.title} Success!!`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='relative'>
                <div className='container mx-auto absolute -inset-2 set bg-slate-700 rounded-lg blur-sm'></div>
                <div className='relative container mx-auto p-4 bg-gray-400 shadow-md rounded-lg '>
                    <span className='text-3xl font-bold'>Form Edit Product</span>
                    <hr />

                    <form action="" className='flex flex-col'
                        onSubmit={handleSummit}>
                        <h1 className='text-2xl mt-4 text-white font-medium bg-slate-800 rounded-md p-4'>Add product</h1>

                        {/* Title */}
                        <label className='font-medium text-lg'>Title</label>
                        <input type="text" className='h-8  mb-2 rounded pl-2 '
                            value={formValue.title}
                            onChange={handleOnChange}
                            placeholder='Enter title'
                            name='title'
                        />

                        {/* desc*/}
                        <label className='font-medium text-lg'>Description</label>
                        <input type="text" className='h-8 pl-2  mb-2 rounded-lg'
                            value={formValue.description}
                            onChange={handleOnChange}
                            placeholder='Enter description'
                            name='description' />

                        {/* Price */}
                        <label className='font-medium text-lg'>Price</label>
                        <input type="number" className='h-8 pl-2 border mb-2 rounded-lg'
                            value={formValue.price}
                            onChange={handleOnChange}
                            placeholder='Enter price'
                            name='price' />


                        {/* Quantity */}
                        <label className='font-medium text-lg'>Quantity</label>
                        <input type='number' className='h-8 pl-2 mb-2 rounded-lg'
                            value={formValue.quantity}
                            onChange={handleOnChange}
                            placeholder='Enter quantity'
                            name='quantity' />

                        <label className='font-medium text-lg'>Category</label>
                        <select name="categoryId"
                            onChange={handleOnChange} id=""
                            className='h-8 pl-2 mb-2 rounded-lg'
                            required
                            value={formValue.categoryId}>

                            <option value={categories.name} disabled>Plese select</option>

                            {categories.map((item, index) =>
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            )}

                        </select>

                        {/* Upload File */}
                        <Uploadfile formValue={formValue}
                            setFormValue={setFormValue} />

                        {/* Summit Button */}
                        <div className='flex flex-row justify-center'>
                            <button className='h-10 bg-gray-800 text-white w-48 flex justify-center items-center rounded-md
                    hover:bg-gray-500 hover:text-black hover:font-bold 
                    ' onSubmit={handleSummit}>Summit</button>
                        </div>
                    </form>
                </div>
            </div>



        </div>
    )
}

export default FormProduct