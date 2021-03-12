import React, { useState } from 'react';
import './style.css';

// Components
import Tab from '../Tab';

const TabBar = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    // Set index of active tab
    const handleActiveTab = (e) => {
        const tabIndex = Number(e.currentTarget.getAttribute('data-index'));
        setActiveTab(tabIndex);
    }

    return (
        <section className='tab-bar'>
            {props.tabData.map((tab, index) => {
                const activeClassName = (index === activeTab) ? 'tab-active' : 'tab-inactive'

                return <Tab key={index} tabIndex={index} tabId={tab.tabId} tabName={tab.tabName} activeClass={activeClassName} onClick={(e) => {
                    handleActiveTab(e);
                    props.onClick(e);
                }} />
            })}
        </section>
    );
}

export default TabBar;