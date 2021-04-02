import React from 'react';
import './style.css';

const WorkbenchNavigation = (props) => {
    return (
        <nav className="navigation-bar">{props.children}</nav>
    );
}

export default WorkbenchNavigation;