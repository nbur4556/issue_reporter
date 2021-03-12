import React from 'react';

const Tab = (props) => {
    return (
        <div data-id={props.tabId} onClick={props.onClick}>{props.tabName}</div>
    )
}

export default Tab;