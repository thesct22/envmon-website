import React from 'react'
import { func, string } from 'prop-types';
import '../App.css';

import ToggleButton from './ToggleButton'

const Toggle = ({theme,  toggleTheme }) => {
    return (
      <ToggleButton toggleTheme={toggleTheme} daynight={true} />
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;