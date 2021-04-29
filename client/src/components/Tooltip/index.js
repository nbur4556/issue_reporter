import React from 'react';
import './style.css';

const Tooltip = (props) => {
    return (
        <span className={props.direction || 'top'} style={{ width: props?.width || '5rem' }}> { props.children}</span >
    );
}

export default Tooltip;