import React from 'react';
import './style.css';

// Icons
import { ReactComponent as AddIcon } from '../../icons/add.svg';

const IconButton = ({ onClick, alt, cy }) => {
    return (
        <button className="icon-button" onClick={onClick} data-cy={cy}>
            <AddIcon />
        </button>
    );
}

export default IconButton;