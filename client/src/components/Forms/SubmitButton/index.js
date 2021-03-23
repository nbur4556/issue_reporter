import React from 'react';

const SubmitButton = (props) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        props.onClick(e);
    }

    return (
        <button onClick={handleOnClick} data-cy={props.cy || "submit"}>
            {props.label || "Submit"}
        </button>
    )
}

export default SubmitButton;