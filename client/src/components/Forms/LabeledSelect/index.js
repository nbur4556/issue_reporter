import React from 'react';

const LabeledSelect = (props) => {
    return (
        <label htmlFor={props.name}>
            {props.label}
            <select name={props.name} onChange={props.onChange} data-cy={props.cy || props.name}>
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;