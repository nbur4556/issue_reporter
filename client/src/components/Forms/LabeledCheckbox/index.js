import React from 'react';
import '../formStyles.css';

const LabeledCheckbox = ({ name, label, cy, ...rest }) => {
    return (
        <label className="labeled-checkbox" htmlFor={name}>
            {label}

            <input type="checkbox" data-cy={cy || name} {...rest} />
            <span></span>
        </label>
    )
}

export default LabeledCheckbox;