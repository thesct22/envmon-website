import React, { useState, useEffect,Component } from "react";

import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler";

import config from './firebaseConfig';
import firebase from "firebase/app";
import "firebase/database";
import {FirebaseDatabaseProvider, FirebaseDatabaseNode} from "@react-firebase/database";

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import "./App.css";

const App = () => {
  const [firebaseconfig,setconfig]=useState(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig);
 }
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const data = [
    {									
        color: "steelblue", 
        points: [{x: 1, y: 28}, {x: 3, y: 26}, {x: 7, y: 26},{x: 9, y: 24}] 
    },
    {									
      color: "green", 
      points: [{x: 1, y: 23}, {x: 3, y: 23}, {x: 7, y: 24},{x: 8, y: 25}] 
  }
];

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <div className="App">
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
            <Toggle theme={theme} toggleTheme={themeToggler} />
            <h4>Hello World</h4>
            <LineChart 
              width={600}
              height={400}
              data={data}
            />
            <FirebaseDatabaseNode
            path="hum/"
            orderByKey
            // orderByValue={"created_on"}
          >
            {d=>{
              console.log(d);
              return(
                null
              )
            }}
          </FirebaseDatabaseNode>
          </FirebaseDatabaseProvider>
        </div>
      </>
    </ThemeProvider>
    
  );
};
export default App;