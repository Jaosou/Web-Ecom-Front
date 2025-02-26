import React from 'react'
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { paymentStripe } from '../../api/stripe';
import useEcomStore from '../../store/ecom_store';
import CheckoutForm from '../../components/CheckOutForm';
import MainNav from '../../components/MainNav'

const stripePromise = loadStripe("pk_test_51QpYL9FkflQSIIOKLW9GEJ3LytXFIx7fvMyMMMg8V6335aMWTrpmuXJlr5D4m7KJvRu9eUqUxagpwWaCseb8Ud3r007he1sxxU");

const Payment = () => {
    const token = useEcomStore((state) => state.token)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        paymentStripe(token)
            .then((res) => {
                console.log(res)
                setClientSecret(res.data.clientSecret)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <div>
            {
                clientSecret && (
                    <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )
            }
        </div>
    )
}

export default Payment