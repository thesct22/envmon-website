import React from 'react'
import config from './components/firebaseConfig';
import firebase from 'firebase/app';
import './App.css'
import 'firebase/database';
const Main =({handleLogout},{handleSignUp})=> {
    return (
      <section className="mainBody">
        <nav>
          <h2> Welcome </h2>
          <div className="dropdown">
            <div className="opList">
              <a href="#">Humidity</a>
              <a href="#">Temperature</a>
              <a href="#">Register</a>
            </div>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </section>
    )
}

export default Main
