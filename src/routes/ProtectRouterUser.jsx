import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/ecom_store'
import { currentUser } from '../api/auth'
import LoadingToDirect from './LoadingToDirect'

const ProtectRouterUser = ({ element }) => {

    const [statePass, setStatePass] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(()=>{
        if (user && token) {
            //Todo : send to back
            currentUser(token)
            .then((res)=>setStatePass(true))
            .catch((res)=>setStatePass(false))
        }
    },[])

    return statePass? element : <LoadingToDirect/>
}

export default ProtectRouterUser