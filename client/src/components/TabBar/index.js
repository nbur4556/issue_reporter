import React from 'react';

// Components
import Tab from '../Tab';

const TabBar = (props) => {
    return (
        <section>
            {props.tabData.map(tab => {
                return <Tab key={tab.tabId} tabName={tab.tabName} tabId={tab.tabId} onClick={props.onClick} />
            })}
        </section>
    );
}

export default TabBar;