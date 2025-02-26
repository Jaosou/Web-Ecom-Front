import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom_store'
import { changeStatusUser, getListUser } from '../../api/admin'
import { changeRoleUser } from '../../api/admin'
import { changeEnableUser, statusAdmin } from '../../utils/StatusFormat'

const TableUser = () => {

    const token = useEcomStore((state) => state.token)
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        hdleGetListUser(token)
    }, [])

    const hdleGetListUser = (token) => {
        getListUser(token)
            .then((res) => {
                console.log(res)
                setListUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdleOnChangeRole = (token, id, roleUpdate) => {
        changeRoleUser(token, id, roleUpdate)
            .then((res) => {
                console.log(res)
                hdleGetListUser(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdleOnChangeStatus = (token, id, statusUpdate) => {
        changeStatusUser(token, id, statusUpdate)
            .then((res) => {
                console.log(res)
                hdleGetListUser(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='font-bold w-44 py-1 px-3 rounded-lg flex justify-center text-xl text-gray-800 bg-gray-300 mb-4'>
                <h1 >
                    Manage User
                </h1>
            </div>

            <div className='bg-white rounded-xl p-4'>
                <table className='border rounded-lg'>
                    <thead className='bg-gray-300'>
                        <th className='w-1/12'>No.</th>
                        <th className='w-2/5'>Email</th>
                        <th>Address</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                        <th>Status</th>
                        <th>Edit status</th>
                    </thead>
                    <tbody>
                        {
                            listUser.map((user, index) => {
                                return (
                                    <tr>
                                        <td className='text-center py-4'>{user.id}</td>
                                        <td className='pl-10'>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.name}</td>
                                        <td className='text-center' >
                                            <div className={statusAdmin(user.role)}>
                                                {user.role}
                                            </div>
                                        </td>
                                        <td className='text-center'><select value={user.role} onChange={(e) => hdleOnChangeRole(token, user.id, e.target.value)} name="" id="">
                                            <option>
                                                Admin
                                            </option>
                                            <option value='user'>
                                                User
                                            </option>
                                        </select></td>
                                        <td className='text-center w-1/12' >
                                            <div className={changeEnableUser(user.enable)}>
                                                {
                                                    user.enable === true
                                                        ? <p>Enable</p>
                                                        : <p>Disable</p>
                                                }
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            <button className={changeEnableUser(!user.enable)} value={user.enable} onClick={() => hdleOnChangeStatus(token, user.id, user.enable)}>
                                                {user.enable ? "Disable" : "Enable"}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default TableUser