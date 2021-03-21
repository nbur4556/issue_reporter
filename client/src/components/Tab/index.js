import React from 'react';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab, removeTab } = props

    return (
        <div className={`tab ${activeClass}`} data-index={tabIndex} data-id={tab.tabId} onClick={selectTab}>
            {tab.tabName}
            <button onClick={removeTab}>X</button>
        </div>
    )
}

export default Tab;