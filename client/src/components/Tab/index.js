import React, { useContext } from 'react';

// Components
import IconButton from '../IconButton';

// Contexts
import { UiDispatcherContext } from '../../pages/Workbench';

const Tab = (props) => {
    const { tab, tabIndex, activeClass, selectTab } = props
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const removeProjectTab = e => {
        e.stopPropagation();
        dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: tabIndex } });
    }

    return (
        <div className={`tab ${activeClass}`} onClick={selectTab} data-id={tab.tabId} data-index={tabIndex}>
            <p>{tab.tabName}</p>
            <IconButton
                iconName={(activeClass === 'tab-active') ? "exit" : "exitLight"}
                onClick={removeProjectTab}
                width={15} alt="exit button"
                tooltip={{ text: 'close tab', direction: 'bottom' }}
            />
        </div>
    )
}

export default Tab;