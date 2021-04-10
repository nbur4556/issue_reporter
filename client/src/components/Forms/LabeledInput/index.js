import React from 'react';
import '../labeledInputStyle.css';

const LabeledInput = (props) => {
    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <input name={props.name}
                type={props.type || "text"}
                placeholder={props.placeholder}
                onChange={props.onChange}
                data-cy={props.cy || props.name} />
        </label>
    );
}

export default LabeledInput;