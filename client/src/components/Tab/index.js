import React from 'react';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab } = props
    const { dispatch, ACTIONS } = props.uiDispatcher;

    const removeProjectTab = () => dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } });

    return (
        // <div className={`tab ${activeClass}`} data-id={tab.tabId} onClick={selectTab}>
        //     <p>{tab.tabName}</p>
        //     <button onClick={
        //         dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } })
        //     } />
        // </div>

        <div className={`tab ${activeClass}`} data-id={tab.tabId}>
            <p>{tab.tabName}</p>
            <button onClick={removeProjectTab}>X</button>
        </div>
    )
}

export default Tab;