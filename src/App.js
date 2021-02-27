import React, { useState, useEffect,Component } from "react";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler"
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import "./App.css";

const App = () => {
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
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <h4>Hello World</h4>
          <LineChart 
                        width={600}
                        height={400}
                        data={data}
                    />
        </div>
      </>
    </ThemeProvider>
    
  );
};
export default App;