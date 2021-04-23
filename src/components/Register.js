import React from 'react'

import './Components.css'

const Register =()=> {
    return (
        <div className="register">
            <div className="form">
                <label htmlFor="user" className="user">UserName</label><br/><br/>
                <input type="text" required className="usernameinp"/>
                <div className="space">                </div>
                <label htmlFor="email" className="email">Email</label><br/><br/>
                <input type="email" required className="emailinp"/>
                <div className="space">                </div>
                <label htmlFor="password" className="password">Password</label><br/><br/>
                <input type="password" required className="passwordinp"/>
            </div>
            <div className="space">                </div>
            <div className="divbtnLogin">
                <button className="btnLogin">Register</button>
            </div>
            <div className="space">                </div>
            <div className="authority">
                <label htmlFor="admin" className="admin"> Admin User ?
                    <span>
                        <input type="checkbox" className="admin" value="admin"/>
                    </span>
                </label>
            </div>
        </div>
    )
}

export default Register
