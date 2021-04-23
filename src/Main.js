import React, { useState, useEffect,Component} from 'react';

import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler";


import config from './components/firebaseConfig';
import firebase from 'firebase/app';
//import './App.css'
import 'firebase/database';
import {FirebaseDatabaseProvider, FirebaseDatabaseNode} from "@react-firebase/database";

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';


const Main =({handleLogout},{handleSignUp})=> {

  const [firebaseconfig,setconfig]=useState(config);
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseconfig);
//  }
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const data = [];
  //   {									
  //       points: [{x: 1, y: 28}, {x: 3, y: 26}, {x: 7, y: 26},{x: 9, y: 24}] 
  //   },
  //   {									
  //     points: [{x: 1, y: 23}, {x: 3, y: 23}, {x: 7, y: 24},{x: 8, y: 25}] 
  //   }
  // ];
  console.log(data);
  if(!mountedComponent) return <div/>
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
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <button onClick={handleLogout}>Logout</button>
          
        </nav>

        <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
      
        <div className="App">
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
            
            <h4>Temperature</h4>
            <FirebaseDatabaseNode
              path="temp/"
              orderByKey
              // orderByValue={"created_on"}
            >
              {d=>{
                if(d.value!=null)
                {
                
                  var temppoints=Object.keys(d.value).map(function(keyName, keyIndex) {
                    
                    var plot1=Object.keys(d.value[keyName]).map(function(hum, humIndex) {
                      var obj={x:null,y:null};
                      var milliseconds=Number(hum);
                      obj.y = new Date(milliseconds);
                      obj.x=d.value[keyName][hum];
                      return obj;
                    });
                    var temppoint={points:null};
                    temppoint.points=plot1;
                    return temppoint;
                  });
                  console.log(temppoints);
                  return(
                  
                  <LineChart 
                    width={600}
                    height={400}
                    data={temppoints}
                  />
                )
                }
                else return null
                
              }}
          </FirebaseDatabaseNode>
          </FirebaseDatabaseProvider>
          <hr></hr>
          <h4>Humidity</h4>
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
          <FirebaseDatabaseNode
            path="hum/"
            orderByKey
            // orderByValue={"created_on"}
          >
            {d=>{
              if(d.value!=null)
              {
              
                var temppoints=Object.keys(d.value).map(function(keyName, keyIndex) {
                  
                  var plot1=Object.keys(d.value[keyName]).map(function(hum, humIndex) {
                    var obj={x:null,y:null};
                    obj.x=Number(hum);
                    obj.y=d.value[keyName][hum];
                    return obj;
                  });
                  var temppoint={points:null};
                  temppoint.points=plot1;
                  return temppoint;
                });
                console.log(temppoints);
                return(
                
                <LineChart 
                  width={600}
                  height={400}
                  data={temppoints}
                />
              )
              }
              else return null
              
            }}
          </FirebaseDatabaseNode>
          </FirebaseDatabaseProvider>
        </div>
      </>
    </ThemeProvider>

      </section>
    )
}

export default Main
