import React from 'react'
import { logout } from '../services/loginService'

const User = ({ history }) => {
    const handleLogout = () => {
        logout()
        history.push('/')

    }

    return (

        <button onClick={handleLogout} className="btn">Logout</button>
    )
}

export default User