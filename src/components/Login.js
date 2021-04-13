import React, {Component} from 'react'
import './Components.css'
class Login extends Component{
    render(){
        return (
        <div className="login">
            <div className="form">
                <label htmlFor="email" className="email">Email</label><br/><br/>
                <input type="email" required className="emailinp"/>
                <div className="space">                </div>
                <label htmlFor="password" className="password">Password</label><br/><br/>
                <input type="password" required className="passwordinp"/>
            </div>
            <div className="space">                </div>
            <div className="divbtnLogin">
                <button className="btnLogin">Login</button>
            </div>
        </div>
        )
    }
}

export default Login