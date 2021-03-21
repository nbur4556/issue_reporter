import React from 'react';

const LabeledInput = (props) => {
    return (
        <label htmlFor={props.name}>
            {props.label}
            <input name={props.name} type={props.type || "text"} placeholder={props.placeholder} onChange={props.onChange} />
        </label>
    );
}

export default LabeledInput;