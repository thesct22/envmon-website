import React from "react";

const RadioButton = (props) => {
    return (
            <input id={props.id} name={props.id} onChange={props.changed} type="radio" checked={props.isSelected} />
    );
}

export default RadioButton;