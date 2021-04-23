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
import { computeHeadingLevel } from "@testing-library/dom";

const App = () => {
  const [firebaseconfig,setconfig]=useState(config);
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseconfig);
//  }
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const colorarray=["Green", "Aqua", "Coral", "Magenta", "Orchid", "DeepPink", "Lime", "Yellow", "SteelBlue", "Violet"];

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <div className="App">
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
                  temppoint.color=colorarray[keyIndex];
                  temppoint.points=plot1;
                  return temppoint;
                });
                console.log(temppoints);
                return(
                
                <LineChart 
                  width={1600}
                  height={800}
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
    
  );
};
export default App;