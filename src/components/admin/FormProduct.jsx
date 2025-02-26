import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom_store'
import { createProduct, getProducts, removeProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import './FormProduct.css'
import Uploadfile from './Uploadfile'
import { Link, Links } from 'react-router-dom'
import { numberFormat } from '../../utils/Number'

const initialState = {
    title: '',
    description: '',
    price: null,
    quantity: null,
    categoryId: '',
    images: []
}
const FormProduct = () => {

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProducts = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)

    const [formValue, setFormValue] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
        images: []
    })

    useEffect(() => {
        //Code
        getCategory(token)
        getProducts(100)
    }, [])

    const handleOnChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    const handleSummit = async (event) => {
        event.preventDefault()
        try {
            const res = await createProduct(token, formValue)
            setFormValue(initialState)
            console.log(res)
            toast.success(`Add data: ${res.data.title} Success!!`)
            getProducts(100)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemoveSummit = async (id) => {
        if (window.confirm('Remove?')) {
            try {
                const res = await removeProduct(token, id)
                getProducts(100)
                toast.success('Delete Success!!')
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <div className='relative'>
                <div className='container mx-auto absolute -inset-2 set bg-slate-700 rounded-lg blur-sm'></div>
                <div className='relative container mx-auto p-4 bg-gray-400 shadow-md rounded-lg '>
                    <span className='text-3xl font-bold'>Form Product</span>
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

                            <option value="" disabled>Plese select</option>

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


            <div className='relative mt-8'>
                <div className='container mx-auto absolute -inset-2 bg-slate-700 rounded-lg blur-sm'></div>
                <div className='relative container mx-auto p-4 bg-gray-400 shadow-md rounded-lg '>
                    <table class="table " className='w-full'>
                        <thead className='bg-gray-300 border-b-2'>
                            <tr className=''>
                                <th className='headerTable ' scope="col">No.</th>
                                <th className='headerTable' scope="col">Title</th>
                                <th className='headerTable' scope="col">Description</th>
                                <th className='headerTable' scope="col">Price</th>
                                <th className='headerTable' scope="col">Quantity</th>
                                <th className='headerTable' scope="col">Sold</th>
                                <th className='headerTable' scope="col">Time</th>
                                <th className='headerTable' scope="col">Image</th>
                                <th className='headerTable' scope="col">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th className='childTable' scope="row">{index + 1}</th>
                                            <td className='childTable'>{item.title}</td>
                                            <td className='childTable'>{item.description}</td>
                                            <td className='childTable'>{numberFormat(item.price)}</td>
                                            <td className='childTable'>{item.quantity}</td>
                                            <td className='childTable'>{item.sold}</td>
                                            <td className='childTable'>{item.updatedAt}</td>
                                            <td className='childTable'>
                                                {
                                                    item.images.length > 0
                                                        ? <img className='h-24 w-24 rounded-lg' src={item.images[0].url} alt="" />
                                                        : <div className='h-24 w-24 flex justify-center items-center
                                                bg-gray-900
                                                text-white
                                                rounded-lg
                                                font-bold'>
                                                            No image
                                                        </div>
                                                }</td>
                                            <td className='childTable'>
                                                <p className='bg-yellow-500 w-20 h-7 rounded-lg flex items-center justify-center text-white font-bold m-2'>
                                                    <Link to={'/admin/product/' + item.id}>Edit</Link>
                                                </p>
                                                <p className='bg-red-500 w-20 h-7 rounded-lg flex items-center justify-center text-white font-bold m-2'>
                                                    <p onClick={() => handleRemoveSummit(item.id)}>Remove</p>
                                                </p></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FormProduct