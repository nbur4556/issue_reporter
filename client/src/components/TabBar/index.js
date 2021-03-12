import React from 'react';
import './style.css';

// Components
import Tab from '../Tab';

const TabBar = (props) => {
    return (
        <section className='tab-bar'>
            {props.tabData.map((tab, index) => {
                return (index === 0)
                    ? <Tab key={tab.tabId} tabName={tab.tabName} tabId={tab.tabId} onClick={props.onClick} activeClass='tab-active' />
                    : <Tab key={tab.tabId} tabName={tab.tabName} tabId={tab.tabId} onClick={props.onClick} activeClass='tab-inactive' />;
            })}
        </section>
    );
}

export default TabBar;