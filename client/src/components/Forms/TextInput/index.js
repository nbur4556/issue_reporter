import React from 'react';

const TextInput = (props) => {
    return (
        <label htmlFor={props.name}>
            {props.label}
            <input name={props.name} type="text" placeholder={props.placeholder} onChange={props.onChange} />
        </label>
    );
}

export default TextInput;