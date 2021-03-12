import React from 'react';

const Tab = (props) => {
    return (
        <div
            className={`tab ${props.activeClass}`}
            data-index={props.tabIndex}
            data-id={props.tabId}
            onClick={props.onClick}>{props.tabName}
        </div>
    )
}

export default Tab;