import React from 'react';
import '../labelStyle.css';

const LabeledSelect = (props) => {
    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <select name={props.name} onChange={props.onChange} data-cy={props.cy || props.name}>
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;