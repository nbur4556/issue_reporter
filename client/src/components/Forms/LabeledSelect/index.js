import React from 'react';
import '../labeledInputStyle.css';

const LabeledSelect = (props) => {
    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <select name={props.name} value={props.value} onChange={props.onChange} data-cy={props.cy || props.name}>
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;