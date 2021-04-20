import React from 'react';
import './style.css';

// Icons
import addIcon from '../../icons/addMain.svg';
import addLightIcon from '../../icons/addLight.svg';
import exitIcon from '../../icons/closeMain.svg';
import exitLightIcon from '../../icons/closeLight.svg';

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