import React from 'react';

const Tab = (props) => {
    return (
        <div className={`tab ${props.activeClass}`}
            data-index={props.tabIndex}
            data-id={props.tabId}
            onClick={props.selectTab}>

            {props.tabName}
            <button onClick={props.removeTab}>X</button>
        </div>
    )
}

export default Tab;