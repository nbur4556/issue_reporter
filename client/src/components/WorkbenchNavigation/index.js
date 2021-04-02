import React from 'react';

const WorkbenchNavigation = (props) => {
    return (
        <nav className="navigation-bar">{props.children}</nav>
    );
}

export default WorkbenchNavigation;