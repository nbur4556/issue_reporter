import React from 'react';
import '../formStyles.css';

//Components
import Tooltip from '../../Tooltip';

const LabeledCheckbox = ({ name, label, defaultChecked, colorClass = 'checkbox-main-color', tooltip, cy, ...rest }) => {
    return (
        <label className={`labeled-checkbox tooltip-parent ${colorClass}`} htmlFor={name}>
            {label}
            {(tooltip) ? <Tooltip direction={tooltip?.direction} width={tooltip?.width}>{tooltip.text}</Tooltip> : null}

            {console.log(defaultChecked)}

            <input type="checkbox" data-cy={cy || name} checked={defaultChecked} {...rest} readOnly />
            <span></span>
        </label>
    )
}

export default LabeledCheckbox;