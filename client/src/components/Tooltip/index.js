import React from 'react';
import './style.css';

const Tooltip = (props) => {
    return (
        <span className={props.direction}>{props.children}</span>
    );
}

export default Tooltip;