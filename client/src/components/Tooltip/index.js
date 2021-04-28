import React from 'react';
import './style.css';

const Tooltip = (props) => {
    return (
        <span>{props.children}</span>
    );
}

export default Tooltip;