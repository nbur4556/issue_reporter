import React from 'react';
import '../formStyles.css';

const LabeledCheckbox = ({ name, label, cy, ...rest }) => {
    return (
        <label className="labeled-input" htmlFor={name}>
            {label}
            <input type="checkbox" data-cy={cy || name} {...rest} />
        </label>
    )
}

export default LabeledCheckbox;