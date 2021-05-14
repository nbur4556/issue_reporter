import React from 'react';
import '../formStyles.css';

const LabeledInput = (props) => {
    const { label, type, placeholder, cy, ...rest } = props;

    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <input type={type || "text"} placeholder={placeholder} data-cy={cy || props.name} {...rest} />
        </label>
    );
}

export default LabeledInput;