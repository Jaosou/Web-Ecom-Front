import axios from "axios"

export const createUserCart = async (token, form) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/user/cart', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    // code body
    return axios.get("https://web-ecom-api.vercel.app/api/user/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const saveAddressUser = async (token, address) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/user/address', { address }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrderUser = async (token, payload) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/user/order', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getOrders = async (token) => {
    return await axios.get('https://web-ecom-api.vercel.app/api/user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}