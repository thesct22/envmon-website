import React, { useState,useReducer} from 'react';

import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler";
import ToggleButton from './components/ToggleButton'

import config from './components/firebaseConfig';
import firebase from 'firebase/app';
import './App.scss'
import 'firebase/database';
import {FirebaseDatabaseProvider, FirebaseDatabaseNode} from "@react-firebase/database";

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

import RadioButton from "./components/RadioButton.js";

const Checkbox = ({ fnClick, title = "", checked = false }) => {
  return(<label>
    <input
      onChange={e => {
         // console.log(fnClick)
        if (fnClick !== undefined) fnClick(e.target.checked);
      }}
      onClick={e => {
        if (fnClick !== undefined) fnClick(e.target.checked);
      }}
      type="checkbox"
      checked={checked}
    />
    {title}
  </label>)
}



const Main =({handleLogout},{handleSignUp})=> {

  const [firebaseconfig,setconfig]=useState(config);
  var [humtemp, sethumtemp] = useState("/temp");
  var [radios,setradios] = useState("all");
  var [fd,setfd]=useState(0);
  var [td,settd]=useState(0);

  function useForceUpdate(){
    const [value, setValue] = useState(false); // integer state
    return () => setValue(value => !value); // update the state to force render
}

  var initialState= {
    "Control Room":true,
    "Conveyer Belt 1": true,
    "Conveyer Belt 2": true,
    "Manager's Cabin": true,
    "Office Central": true,
    "Office Corner 1": true,
    "Office Corner 2": true,
    "Office Corner 3": true,
    "Office Corner 4": true,
    "Storage Room": true
  };

  const reducer = (state, action) => ({ ...state, ...action });
  const [snchk, setsnchk] =useReducer(reducer, initialState);

  var handleradios =e=>{
      setradios(e.target.id)
  }

  var sensorname=Object.keys(snchk);

  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>
  return (
    <section className="mainBody">
      <nav>
        <h2> EnvMon </h2>

        <Toggle theme={theme} toggleTheme={themeToggler} />
        <ToggleButton  daynight={false} icons={{checked: "🌡", unchecked: "💦"}} sethumtemp={sethumtemp} defaultChecked={true}/>

        <button onClick={handleLogout}>Logout</button>
        
      </nav>

      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles/>
      
          <div className="App">
            <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
              
              <h4>{humtemp==="/temp"?"Temperature":"Humidity"}</h4>
              <FirebaseDatabaseNode
                path={humtemp}
                orderByKey
                // orderByValue={"created_on"}
              >
                {d=>{
                  if(d.value!=null)
                  {
                    var sensorchk=[];
                    var temppoints=Object.keys(d.value).map(function(keyName, keyIndex) {
                      if(snchk[keyName]){
                      
                        var plot1=Object.keys(d.value[keyName]).map(function(hum, humIndex) {
                          var obj={x:null,y:null};
                          obj.x=Number(hum);
                          //var milliseconds=Number(hum);
                          //obj.x = new Date(milliseconds);
                          obj.y=d.value[keyName][hum];
                          return obj;
                        });
                        var temppoint={points:null, name:""};
                        temppoint.name=keyName;
                        temppoint.points=plot1;
                        var snr={};
                        snr[keyName]=false;
                        sensorchk.push(snr);
                        if(radios==="fromdate"){
                          temppoint.points=temppoint.points.filter(function(element){
                            if(element.x>=fd)
                              return element;
                          });
                        }
                        else if(radios==="between"){
                          temppoint.points=temppoint.points.filter(function(element){
                            if(element.x>=fd&&element.x<=td)
                              return element;
                          });
                        }
                        console.log(temppoint)
                        return temppoint;
                      }
                      
                    });
                    console.log(td);
                    console.log(fd);
                    console.log(radios);
                    
                    temppoints = temppoints.filter(function( element ) {
                      return element !== undefined;
                   });
                    console.log(temppoints)


                    //setsnchk(Object.keys(d.value));
                    //console.log(Object.keys(d.value));
                    var setsensorchk=(sensorname)=>{
                      sensorchk[sensorname]=!sensorchk[sensorname];
                    }
                    return(
                    <div>
                      <LineChart 
                        
                        data={temppoints}
                        // isDate={true}
                        xLabel={"TimeStamp"}
                        yLabel={humtemp==="/temp"?"Temperature":"Humidity"}
                        showLegends
                        legendPosition="bottom-right"
                      />
                      
                    </div>
                  )
                  }
                  else return null
                  
                }}
            </FirebaseDatabaseNode>
            </FirebaseDatabaseProvider>
            <div>
              <form>
                {
                  sensorname.map((value)=>{
                    //console.log(snchk)
                    return(
                      <>
                      <Checkbox
                        title={value}
                        fnClick={v => setsnchk({[value]:v})}
                        checked={snchk[value]}
                      /><br/>
                      </>
                    )
                  })
                }
              </form>
            </div>
            <div>
              <form>
                <RadioButton 
                  changed={handleradios} 
                  id="all" 
                  isSelected={ radios === "all" }  
                />
                <label for="all">All data</label><br></br>
                <RadioButton 
                  changed={handleradios} 
                  id="lastn" 
                  isSelected={ radios === "lastn" }  
                />
                <label for="lastn">
                  Last <input type="number" id="lastvals" name="lastvals" disabled={radios!=="lastn"}/> data
                </label><br></br>
                <RadioButton 
                  changed={ handleradios } 
                  id="fromdate" 
                  isSelected={ radios === "fromdate" }  
                />
                <label for="fromdate">
                  Data from {" "}
                  <Datetime onChange={e=>setfd(e._d.getTime())} inputProps={{disabled: radios!=="fromdate"}}/>
                </label><br></br>
                <RadioButton 
                  changed={ handleradios } 
                  id="between" 
                  isSelected={ radios === "between" }  
                />
                <label for="between">
                  Data between 
                  <Datetime onChange={e=>setfd(e._d.getTime())} inputProps={{disabled: radios!=="between"}}/>
                  {" "}and{" "}
                  <Datetime onChange={e=>settd(e._d.getTime())} inputProps={{disabled: radios!=="between"}}/>
                </label><br></br>

              </form>
            </div>


            {/* <Sensors vals={sensorname} setsnchk={setsnchk}/> */}
          </div>
        </>
      </ThemeProvider>
    </section>
  )
}

export default Main
