import React from 'react';
import '../formStyles.css';

const LabeledCheckbox = ({ name, label, colorClass = 'checkbox-main-color', cy, ...rest }) => {
    return (
        <label className={`labeled-checkbox ${colorClass}`} htmlFor={name}>
            {label}

            <input type="checkbox" data-cy={cy || name} {...rest} />
            <span></span>
        </label>
    )
}

export default LabeledCheckbox;