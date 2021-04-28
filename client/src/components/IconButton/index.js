import React from 'react';
import './style.css';

// Components
import Tooltip from '../Tooltip';

// Icons
import addIcon from '../../icons/addMain.svg';
import addLightIcon from '../../icons/addLight.svg';
import exitIcon from '../../icons/closeMain.svg';
import exitLightIcon from '../../icons/closeLight.svg';
import sortIcon from '../../icons/sortMain.svg';
import sortLightIcon from '../../icons/sortLight.svg';
import sortUpIcon from '../../icons/sortUpMain.svg';
import sortUpLightIcon from '../../icons/sortUpLight.svg';
import sortDownIcon from '../../icons/sortDownMain.svg';
import sortDownLightIcon from '../../icons/sortDownLight.svg';

const IconButton = ({ label, iconName, onClick, width, alt, cy }) => {
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
            case 'sort':
                return sortIcon;
            case 'sortLight':
                return sortLightIcon;
            case 'sortUp':
                return sortUpIcon;
            case 'sortUpLight':
                return sortUpLightIcon;
            case 'sortDown':
                return sortDownIcon;
            case 'sortDownLight':
                return sortDownLightIcon;
            default:
                return null;
        }
    }

    return (
        <button className="icon-button tooltip-parent" onClick={onClick} data-cy={cy}>
            <h4>{label}</h4>
            <img src={selectIcon()} alt={alt || "icon"} width={width} />
            <Tooltip>Icon</Tooltip>
        </button>
    );
}

export default IconButton;