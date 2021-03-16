import React from 'react';

const WorkbenchDetailSection = ({ component: Component, ...rest }) => {
    return (
        <section className="detail-section">
            <Component {...rest} />
        </section>
    )
}

export default WorkbenchDetailSection;