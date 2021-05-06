import React from 'react';
import '../formStyles.css';

const LabeledInput = (props) => {
    const { label, type, cy, ...rest } = props;

    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <input type={type || "text"} data-cy={cy || props.name} {...rest} />
        </label>
    );
}

export default LabeledInput;