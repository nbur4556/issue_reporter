import React from 'react';
import '../formStyles.css';

const LabeledSelect = (props) => {
    const { label, placeholder, ...rest } = props;

    return (
        <label className="labeled-input" htmlFor={props.name}>
            {props.label}
            <select data-cy={props.cy || props.name} placeholder={placeholder} {...rest}>
                {(placeholder) ? <option value="" disabled>{placeholder}</option> : <option value=""></option>}
                {props.children}
            </select>
        </label>
    );
}

export default LabeledSelect;