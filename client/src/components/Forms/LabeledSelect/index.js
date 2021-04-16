import React from 'react';
import '../labeledInputStyle.css';

const LabeledSelect = (props) => {
    const { label, ...rest } = props;

    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <select data-cy={props.cy || props.name} {...rest}>
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;