import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import store from '../../store/reducers'

function Protected({ children }) {

    if (!store.getState().user.userId) {
        return <Navigate to="/" />
    }
    return <Outlet/>
}
export default Protected