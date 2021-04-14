import React, { useState, useContext } from 'react';

// Components
import Tab from '../Tab';

// Contexts
import { UiContext, UiDispatcherContext } from '../../pages/Workbench';

const TabBar = () => {
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const tabData = ui.projectTabs.map(project => {
        return { tabId: project._id, tabName: project.projectName }
    });

    const [activeTab, setActiveTab] = useState(0);

    // Set index of active tab
    const handleActiveTab = (tab) => {
        const tabIndex = Number(tab.getAttribute('data-index'));
        setActiveTab(tabIndex);
    }

    const handleSelectTab = (e) => {
        const projectId = e.currentTarget.getAttribute('data-id');

        handleActiveTab(e.currentTarget);
        dispatch({ type: ACTIONS.SELECT_PROJECT, payload: { projectId: projectId } });
    }

    return (
        <section className='tab-bar'>

            {tabData.map((tab, index) => {
                const activeClassName = (index === activeTab) ? 'tab-active' : 'tab-inactive';

                return <Tab key={index}
                    tabIndex={index}
                    tab={tab}
                    activeClass={activeClassName}
                    selectTab={handleSelectTab}
                />
            })}
        </section>
    );
}

export default TabBar;