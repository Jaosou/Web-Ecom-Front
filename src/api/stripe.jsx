import axios from "axios"

export const paymentStripe = async (token) =>
    await axios.post(
        'https://web-ecom-api.vercel.app/api/user/creat-payment-intent', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    },)
