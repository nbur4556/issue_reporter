import React from 'react';
import './style.css';

const Tooltip = (props) => {
    return (
        <span className="top">{props.children}</span>
    );
}

export default Tooltip;