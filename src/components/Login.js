import React from 'react'
import './Components.css'
const Login = (props) =>{
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = props;
    
    // function errorFunction(){
    //     alert({passwordError});
    // }
    return (
        <div className="login">
            <div className="form">
                <label htmlFor="email" className="email">Email</label><br/><br/>
                <input 
                    type="email"
                    autoFocus 
                    required 
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    className="emailinp"
                />
                <p className="errorMsg">{emailError}</p>
                <div className="space">                </div>
                <label htmlFor="password" className="password">Password</label><br/><br/>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e=> setPassword(e.target.value)}
                    className="passwordinp"
                />
                <p className="errorMsg">{passwordError}</p>
                
            </div>
            <div className="space">                </div>
            <div className="divbtnLogin">
                
                    <button onClick={handleLogin}className="btnLogin">
                        Login
                    </button>
                  
            </div>
        </div>
        )
    }

export default Login