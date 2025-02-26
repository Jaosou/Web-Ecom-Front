import axios from "axios";

export const createProduct = async (token, form) => {

    return await axios.post('https://web-ecom-api.vercel.app/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getProducts = async (count = 20) => {
    return await axios.get('https://web-ecom-api.vercel.app/api/products/' + count)
}

export const readProduct = async (token, id) => {
    return await axios.get('https://web-ecom-api.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return await axios.put('https://web-ecom-api.vercel.app/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeProduct = async (token, id) => {
    return await axios.delete('https://web-ecom-api.vercel.app/api/product/' + id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const seachFilters = async (target) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/seach/filters', target)
}

export const listProductBy = async (sort,order,limit) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/productby', {
        sort : sort,
        order : order,
        limit : limit
    })
}


export const uploadFiles = async (token, form) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/images',
        { image: form },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const removeFiles = async (token, public_id) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/removeimage',
        { public_id },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}
