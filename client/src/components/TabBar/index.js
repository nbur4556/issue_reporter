import React, { useState } from 'react';

// Components
import Tab from '../Tab';

const TabBar = ({ tabData, uiDispatcher }) => {
    const { dispatch, ACTIONS } = uiDispatcher;
    const [activeTab, setActiveTab] = useState(0);

    // Set index of active tab
    const handleActiveTab = (e) => {
        const tabIndex = Number(e.currentTarget.getAttribute('data-index'));
        setActiveTab(tabIndex);
    }

    const handleSelectTab = (e) => {
        const projectId = e.currentTarget.getAttribute('data-id');
        handleActiveTab(e);
        dispatch({ type: ACTIONS.SELECT_PROJECT, payload: { projectId: projectId } });
    }

    return (
        <section className='tab-bar'>
            {tabData.map((tab, index) => {
                const activeClassName = (index === activeTab) ? 'tab-active' : 'tab-inactive'

                return <Tab key={index}
                    tabIndex={index}
                    tab={tab}
                    activeClass={activeClassName}

                    selectTab={handleSelectTab}
                    uiDispatcher={uiDispatcher} />
            })}
        </section>
    );
}

export default TabBar;