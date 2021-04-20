import React from 'react';
import './style.css';

// Icons
import addIcon from '../../icons/plus.svg';
import addLightIcon from '../../icons/plus.svg';
import exitIcon from '../../icons/close.svg';
import exitLightIcon from '../../icons/close.svg';

const IconButton = ({ iconName, onClick, width, alt, cy }) => {
    const selectIcon = () => {
        switch (iconName) {
            case 'add':
                return addIcon;
            case 'addLight':
                return addLightIcon;
            case 'exit':
                return exitIcon;
            case 'exitLight':
                return exitLightIcon;
            default:
                return null;
        }
    }

    return (
        <button className="icon-button" onClick={onClick} data-cy={cy}>
            <img src={selectIcon()} alt={alt || "icon"} width={width} />
        </button>
    );
}

export default IconButton;