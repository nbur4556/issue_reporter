import React from 'react';

const IconButton = ({ onClick, cy }) => {
    return (
        <button className="icon" onClick={onClick} data-cy={cy}>Icon</button>
    );
}

export default IconButton;