import React from 'react';
import './style.css';

// Icons
import addIcon from '../../icons/add.svg';
import exitIcon from '../../icons/exit.svg';

const IconButton = ({ iconName, onClick, cy }) => {
    const selectIcon = () => {
        switch (iconName) {
            case 'add':
                return addIcon;
            case 'exit':
                return exitIcon;
            default:
                return null;
        }
    }

    return (
        <button className="icon-button" onClick={onClick} data-cy={cy}>
            {/* {selectIcon(iconName)} */}

            <img src={selectIcon()} alt="icon" />
        </button>
    );
}

export default IconButton;