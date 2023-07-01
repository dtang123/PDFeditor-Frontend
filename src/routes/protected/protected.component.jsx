import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Protected({ children }) {

    if (!localStorage.getItem('uid')) {
        return <Navigate to="/" />
    }
    return <Outlet/>
}
export default Protected