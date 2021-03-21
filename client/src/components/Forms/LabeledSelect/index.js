import React from 'react';

const LabeledSelect = (props) => {
    return (
        <label htmlFor={props.name}>
            {props.label}
            <select name={props.name} onChange={props.onChange}>
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;