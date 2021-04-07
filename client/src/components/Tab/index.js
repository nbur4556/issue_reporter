import React from 'react';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab, uiDispatcher } = props
    const { dispatch, ACTIONS } = uiDispatcher;

    return (
        <div className={`tab ${activeClass}`} data-index={tabIndex} data-id={tab.tabId} onClick={selectTab}>
            <p>{tab.tabName}</p>
            <button onClick={
                dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } })
            } />
        </div>
    )
}

export default Tab;