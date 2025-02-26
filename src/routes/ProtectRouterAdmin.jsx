import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/ecom_store'
import { currentAdmin } from '../api/auth'
import LoadingToDirect from './LoadingToDirect'

const ProtectRouterAdmin = ({ element }) => {

    const [statePass, setStatePass] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(()=>{
        if (user && token) {
            //Todo : send to back
            currentAdmin(token)
            .then((res)=>setStatePass(true))
            .catch((res)=>setStatePass(false))
        }
    },[])

    return statePass? element : <LoadingToDirect/>
}

export default ProtectRouterAdmin