import axios from 'axios'

//https://web-ecom-api.vercel.app/api/admin/orders
export const getOrderAdmin = async (token) => {
    return await axios.get('https://web-ecom-api.vercel.app/api/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeRoleUser = async (token, id, roleUpdate) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/change-role', {
        id : id,
        role : roleUpdate,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeStatusUser = async (token, id, statusUpdate) => {
    return await axios.post('https://web-ecom-api.vercel.app/api/change-status', {
        id : id,
        enable : !statusUpdate
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// https://web-ecom-api.vercel.app/api/admin/order-status
export const editOrderStatus = async (token, orderId, orderStatus) => {
    return await axios.put('https://web-ecom-api.vercel.app/api/admin/order-status', {
        orderId,
        orderStatus
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//
export const getListUser = async (token) => {
    return await axios.get('https://web-ecom-api.vercel.app/api/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}