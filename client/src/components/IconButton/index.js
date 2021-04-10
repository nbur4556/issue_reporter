import React from 'react';
import './style.css';

// Icons
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import { ReactComponent as ExitIcon } from '../../icons/exit.svg';

const IconButton = ({ iconName, onClick, cy }) => {
    const selectIcon = (iconName) => {
        switch (iconName) {
            case 'add':
                return (<AddIcon />);
            case 'exit':
                return (<ExitIcon />)
            default:
                return null;
        }
    }

    return (
        <button className="icon-button" onClick={onClick} data-cy={cy}>
            {selectIcon(iconName)}
        </button>
    );
}

export default IconButton;