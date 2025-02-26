import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resizer from "react-image-file-resizer";
import useEcomStore from '../../store/ecom_store'
import { removeFiles, uploadFiles } from '../../api/Product';
import { AiOutlineLoading } from "react-icons/ai";

const Uploadfile = ({ formValue, setFormValue }) => {

    const token = useEcomStore((state) => state.token)

    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = formValue.images

            for (let index = 0; index < files.length; index++) {


                //Todo : Validate File
                const file = files[index]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File : ${file.name} dont type image.!!!`)
                    continue
                }

                //Todo : Image Resize
                Resizer.imageFileResizer(
                    files[index],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        //Call end
                        uploadFiles(token, uri)
                            .then((res) => {


                                allFiles.push(res.data)
                                console.log(allFiles)
                                setFormValue({
                                    ...formValue,
                                    images: allFiles
                                })
                                toast.success('Upload Image Success!!!!')
                                setIsLoading(false)
                            })
                            .catch((err) =>
                                {console.log(err)
                                setIsLoading(false)})
                        
                    },
                    "base64"

                )
            }
        }
    }

    const handleDelete = (public_id) => {
        const image = formValue.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImage = image.filter((item, index) => {
                    console.log(item)
                    return item.public_id !== public_id //Todo : return not target images
                })
                console.log('Filter', filterImage)
                setFormValue({
                    ...formValue,
                    images: filterImage
                })
                toast.error(res.data)
            }) //Todo : Working
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>

            <div className='flex flex-row'>
                {isLoading && <AiOutlineLoading className='h-14 w-14 animate-spin' />}
                {formValue.images.map((item, index) =>
                    <div key={index} className='relative w-24 h-24 mr-4 mb-4 hover:scale-110'>
                        <img src={item.url} alt="" />
                        <span onClick={() => handleDelete(item.public_id)} className='absolute top-0 right-0 bg-red-500 p-3 h-4 w-4 flex items-center justify-center font-bold rounded-md '>x</span>
                    </div>
                )}



            </div>
            <div>

                <label htmlFor="" className='font-medium text-lg'>Upload File :</label>
                <input
                    onChange={handleOnChange} className='ml-4'
                    type="file"
                    name='images'
                    multiple />
            </div>
        </div>
    )
}

export default Uploadfile