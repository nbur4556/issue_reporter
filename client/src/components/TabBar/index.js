import React, { useState, useContext } from 'react';

// Components
import Tab from '../Tab';

// Contexts
import { UiContext } from '../../pages/Workbench';

const TabBar = ({ uiDispatcher }) => {
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = uiDispatcher;

    const tabData = ui.projectTabs.map(project => {
        return { tabId: project._id, tabName: project.projectName }
    });

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
                const activeClassName = (index === activeTab) ? 'tab-active' : 'tab-inactive';

                return <Tab key={index}
                    uiDispatcher={uiDispatcher}
                    tab={tab}

                    activeClass={activeClassName}
                    selectTab={handleSelectTab}
                />
            })}
        </section>
    );
}

export default TabBar;