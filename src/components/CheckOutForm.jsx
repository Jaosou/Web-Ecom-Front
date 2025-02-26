import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import './checkOutForm.css'
import { saveOrderUser } from "../api/user";
import useEcomStore from '../store/ecom_store'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function CheckoutForm() {
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const stripe = useStripe();
    const elements = useElements();

    const clearCart = useEcomStore((state)=>state.clearCart)

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
            /*             confirmParams: {
                            // Make sure to change this to your payment completion page
                            return_url: "http://localhost:3000/complete",
                        }, */
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        console.log(payload)
        if (payload.error) {
            setMessage(payload.error.message);
            console.log('error')
            toast.error(payload.error.message)
        }
        else if(payload.paymentIntent.status === 'succeeded'){
            console.log('Order ready to save!')
            saveOrderUser(token,payload)
            .then((res)=>{
                console.log(res)
                clearCart(token)
                toast.success('Save Order success!')
                navigate('/user/history')
            })
            .catch((err)=>{
                console.log(err)
            })
            toast.success("Payment Complete!")
            console.log("Payment Complete!")
        } else {
            console.log('Something Wrong!')
            toast.warning('Cant Payment')
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <form className="formPay" id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className="button" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}