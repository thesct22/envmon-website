import React, { useState,useReducer} from 'react';

import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import Toggle from "./components/Toggler";
import ToggleButton from './components/ToggleButton'

import config from './components/firebaseConfig';
import firebase from 'firebase/app';
import './App.scss'
import 'firebase/database';
import {FirebaseDatabaseProvider, FirebaseDatabaseNode} from "@react-firebase/database";

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import "./components/react-datetime.css";
import Datetime from "react-datetime";

import RadioButton from "./components/RadioButton.js";

import colorset from "./components/colorset";
import initialState from "./components/initialstate";

import {ListGroup} from 'react-bootstrap';

const Checkbox = ({ fnClick, title = "", checked = false }) => {
  return(<label>
    <input
      onChange={e => {
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


const Main =({handleLogout})=> {

  const [firebaseconfig,setconfig]=useState(config);
  var [humtemp, sethumtemp] = useState("temp/");
  var [radios,setradios] = useState("all");
  var [fd,setfd]=useState(0);
  var [td,settd]=useState(0);
  var [ln,setln]=useState(0);

  const reducer = (state, action) => ({ ...state, ...action });
  const [snchk, setsnchk] =useReducer(reducer, initialState);

  var handleradios =e=>{
      setradios(e.target.id)
  }

  var legend=()=>{
    var x = document.getElementById("legendiv");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  var refresht = ()=>{
    if(humtemp==="temp/"){
      sethumtemp("hum/");
    }
    else{
      sethumtemp("temp/");
    }
  }

  var sensorname=Object.keys(snchk);

  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>
  return (
    <section className="mainBody">
      <nav>
      <div className="container">
      <div className="row">
        <div className="col">
          <h2> EnvMon </h2>
        </div>
        
        
          <div className="col">
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </div>
          <div className="col">
            <ToggleButton  daynight={false} icons={{checked: "🌡", unchecked: "💦"}} sethumtemp={sethumtemp} defaultChecked={true}/>
          </div>
          <div className="col">
            <button onClick={refresht} onClickCapture={refresht}>Refresh</button>
          </div>
          <div className="col">
            <button onClick={legend}>Legend</button>
          </div>
          <div className="col">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>   
        </div> 
      </nav>

      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles/>
      
          <div className="App">
            <FirebaseDatabaseProvider firebase={firebase} {...firebaseconfig}>
              
              <h4>{humtemp==="temp/"?"Temperature":"Humidity"}</h4>
              <FirebaseDatabaseNode
                path={humtemp}
                orderByKey
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
                          obj.y=d.value[keyName][hum];
                          return obj;
                        });
                        var temppoint={points:null, name:""};
                        temppoint.name=keyName;
                        temppoint.color=colorset[keyIndex];
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
                        else if(radios==="lastn"){
                          temppoint.points=temppoint.points.slice(Math.max(temppoint.points.length - ln, 0))
                        }
                        return temppoint;
                      }
                      
                    });
                    
                    temppoints = temppoints.filter(function( element ) {
                      return element !== undefined;
                   });
                    var setsensorchk=(sensorname)=>{
                      sensorchk[sensorname]=!sensorchk[sensorname];
                    }
                    return(
                    <div className="row">
                      <div className="col-sm-9 col-lg-10">
                        <LineChart 
                          id={"thechart"}
                          class={"thechart"}
                          width={1300}
                          heighr={720}
                          data={temppoints}
                          interpolate={"linear"}
                          ticks={10}
                          xLabel={"TimeStamp"}
                          yLabel={humtemp==="temp/"?"Temperature":"Humidity"}
                          xParser={e=>new Date(e)}
                          xDisplay={e=>
                            {
                              var dt= new Date(e)
                              return(dt.toLocaleString())
                            }
                          }
                          onPointHover={(point)=> {
                            return `<p class="popup"><b>X value:</b> ${new Date(point.x)}</p><p class="popup"><b>Y value:</b> ${point.y}</p>`
                          }}
                        />                        
                      </div>
                      <div className="col-sm-3 col-lg-2" id="legendiv">
                      <ListGroup >
                        {
                          temppoints.map((key,index)=>{
                            return(
                            <ListGroup.Item className="changediv" key={index}>
                              <div className="row changediv">
                              <div className="col-1 changediv"><div style={{backgroundColor:key.color, width:"10px", height:"10px"}}></div></div> 
                              <div className="col changediv">
                                {key.name}
                              </div>
                              </div>
                            </ListGroup.Item>)
                          })
                        }
                        
                      </ListGroup>
                      </div>
                    </div>
                  )
                  }
                  else return null
                  
                }}
            </FirebaseDatabaseNode>
            </FirebaseDatabaseProvider>
            <div className="row">
              <div className="col-sm-2">
                <form>
                  {
                    sensorname.map((value)=>{
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
              <div className="col-sm-6">
                <form>
                  <RadioButton 
                    changed={handleradios} 
                    id="all" 
                    isSelected={ radios === "all" }  
                  />
                  <label htmlFor="all">All data</label><br></br>
                  <RadioButton 
                    changed={handleradios} 
                    id="lastn" 
                    isSelected={ radios === "lastn" }  
                  />
                  <label htmlFor="lastn">
                    <div className="row">
                      <div className="col">
                        Last{" "}
                      </div>
                      <div className="col">
                        <input type="number" onChange={e=>setln(e.target.value)} id="lastvals" name="lastvals" disabled={radios!=="lastn"}/> 
                      </div>
                      <div className="col">
                        {" "}data
                      </div>
                    </div>
                  </label><br></br>
                  <RadioButton 
                    changed={ handleradios } 
                    id="fromdate" 
                    isSelected={ radios === "fromdate" }  
                  />
                  <label htmlFor="fromdate">
                    <div className="row">
                    <div className="col-4">
                      Data from{" "}
                    </div>
                    <div className="col">
                      <Datetime className="changediv" onChange={e=>setfd(e._d.getTime())} inputProps={{disabled: radios!=="fromdate"}} />
                    </div>
                    </div>
                    
                  </label><br></br>
                  <RadioButton 
                    changed={ handleradios } 
                    id="between" 
                    isSelected={ radios === "between" }  
                  />
                  <label htmlFor="between">
                  <div className="row">
                    <div className="col-3">
                      Data between 
                    </div>
                    <div className="col">
                      <Datetime className="changediv" onChange={e=>setfd(e._d.getTime())} inputProps={{disabled: radios!=="between"}}/>
                    </div>  
                    <div className="col-1">
                    and{" "}
                    </div>
                    <div className="col">
                      <Datetime className="changediv" onChange={e=>settd(e._d.getTime())} inputProps={{disabled: radios!=="between"}}/>
                    </div>
                  </div>
                  </label><br></br>

                </form>
              </div>
            </div>
          </div>
        </>
      </ThemeProvider>
    </section>
  )
}

export default Main;