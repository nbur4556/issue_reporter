import React from 'react';

const LabeledInput = (props) => {
    return (
        <label className="labeled-input" htmlFor={props.name} style={labelStyle}>
            {props.label}
            <input name={props.name}
                type={props.type || "text"}
                placeholder={props.placeholder}
                onChange={props.onChange}
                data-cy={props.cy || props.name} />
        </label>
    );
}

// Component Layout
const labelStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default LabeledInput;