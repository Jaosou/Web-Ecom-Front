import React, { useEffect, useState } from 'react'
import { createCategory, listCategory , removeCategory} from '../../api/Category'
import useEcomStore from '../../store/ecom_store'
import { ToastContainer, toast } from 'react-toastify';

const FormCategory = () => {

    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    /* const [categorys, setCategorys] = useState([]) */
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    //todo : Protect refesh page
    const handleSummit = async (event) => {
        event.preventDefault()

        //Todo : Check category name is empty????
        if (!name) { return toast.warning('Category name is empty!!') }

        try {
            const res = await createCategory(token, { name })
            toast.success(`Add Category : ${res.data.name} Success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemoveCat = async (id)=>{
        try {
            const res = await removeCategory(token,id)
            toast.success(`Delete category : ${res.data.name} success!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-gray-400 shadow-md rounded-lg '>
            <h1 className='font-bold text-2xl pb-6' >
                Category Management
            </h1>
            <form action="" onSubmit={handleSummit} className='pb-4'>
                <input
                    onChange={(event) => { setName(event.target.value) }} type="text" className='border rounded-md mr-4 h-10' />
                <button className='bg-black text-white p-2 rounded-md'>
                    Add Category
                </button>
            </form>

            <hr className='pb-4' />

            <ul className='list-none'>
                {categories.map((item, index) =>
                    <li
                        key={index}
                        className='h-10 items-center flex justify-between py-2 bg-gray-700 text-white my-2 rounded-md'>
                        <span className='pl-4 text-lg'>{item.name}</span>

                        <button className='pr-4 text-lg font-bold' onClick={()=>handleRemoveCat(item.id)}
                        >Delete</button>
                    </li>
                )}
            </ul>

        </div>
    )
}

export default FormCategory