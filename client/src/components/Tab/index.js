import React from 'react';

// Components
import IconButton from '../IconButton';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab } = props
    const { dispatch, ACTIONS } = props.uiDispatcher;

    const removeProjectTab = () => dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } });

    return (
        <div className={`tab ${activeClass}`} onClick={selectTab} data-id={tab.tabId}>
            <p>{tab.tabName}</p>
            <IconButton iconName="exitLight" onClick={removeProjectTab} width={15} alt="exit button" />
        </div>
    )
}

export default Tab;