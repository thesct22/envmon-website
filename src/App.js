import React, { useState, useEffect,Component } from "react";

import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler";
import Login from "./components/Login"
import Register from "./components/Register"

import config from './firebaseConfig';
import firebase from "firebase/app";
import "firebase/database";
import {FirebaseDatabaseProvider, FirebaseDatabaseNode} from "@react-firebase/database";

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import "./App.css";
import { computeHeadingLevel } from "@testing-library/dom";


const App = () => {
  const [firebaseconfig,setconfig]=useState(config);
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseconfig);
//  }
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const data = [
    {									
        points: [{x: 1, y: 28}, {x: 3, y: 26}, {x: 7, y: 26},{x: 9, y: 24}] 
    },
    {									
      points: [{x: 1, y: 23}, {x: 3, y: 23}, {x: 7, y: 24},{x: 8, y: 25}] 
  }
];
console.log(data);

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <div className="App">
          {/* <Login/> */}
          {/* <Register /> */}
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
            <Toggle theme={theme} toggleTheme={themeToggler} />
            <h4>Hello World</h4>
            
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
                  margin={{
                    top: 35,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  ></LineChart>
              )
              }
              else return null
              
            }}
          </FirebaseDatabaseNode>
          </FirebaseDatabaseProvider>
        </div>
      </>
    </ThemeProvider>
    
  );
};
export default App;