import React from 'react';
import './style.css';

const IconButton = ({ onClick, cy }) => {
    return (
        <button className="icon-button" onClick={onClick} data-cy={cy}>Icon</button>
    );
}

export default IconButton;