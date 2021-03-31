import React from 'react';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab, removeTab } = props

    return (
        <div className={`tab ${activeClass}`} data-index={tabIndex} data-id={tab.tabId} onClick={selectTab}>
            <p>{tab.tabName}</p>
            <button onClick={removeTab}></button>
        </div>
    )
}

export default Tab;