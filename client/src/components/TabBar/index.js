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

    return (
        <section className='tab-bar'>
            {tabData.map((tab, index) => {
                const activeClassName = (index === activeTab) ? 'tab-active' : 'tab-inactive'

                return <Tab key={index}
                    tabIndex={index}
                    tab={tab}
                    activeClass={activeClassName}

                    selectTab={(e) => {
                        handleActiveTab(e);
                        ui.handleSelectProject(e);
                    }}
                    removeTab={ui.handleRemoveProjectTab} />
            })}
        </section>
    );
}

export default TabBar;