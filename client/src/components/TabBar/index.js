import React, { useState } from 'react';
import './style.css';

// Components
import Tab from '../Tab';

const TabBar = ({ ui, tabData }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Set index of active tab
    const handleActiveTab = (e) => {
        const tabIndex = Number(e.currentTarget.getAttribute('data-index'));
        setActiveTab(tabIndex);
    }

    const handleSelectTab = (e) => {
        handleActiveTab(e);
        ui.handleSelectProject(e);
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
                    removeTab={ui.handleRemoveProjectTab} />
            })}
        </section>
    );
}

export default TabBar;