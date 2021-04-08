import React from 'react';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab } = props
    const { dispatch, ACTIONS } = props.uiDispatcher;

    const removeProjectTab = () => dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } });

    return (
        <div className={`tab ${activeClass}`} onClick={selectTab} data-id={tab.tabId}>
            <p>{tab.tabName}</p>
            <button onClick={removeProjectTab} />
        </div>
    )
}

export default Tab;