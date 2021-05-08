import React from 'react';
import '../formStyles.css';

//Components
import Tooltip from '../../Tooltip';

const LabeledCheckbox = ({ name, label, colorClass = 'checkbox-main-color', tooltip, cy, ...rest }) => {
    return (
        <label className={`labeled-checkbox tooltip-parent ${colorClass}`} htmlFor={name}>
            {label}
            {(tooltip) ? <Tooltip direction={tooltip?.direction} width={tooltip?.width}>{tooltip.text}</Tooltip> : null}

            <input type="checkbox" data-cy={cy || name} {...rest} />
            <span></span>
        </label>
    )
}

export default LabeledCheckbox;