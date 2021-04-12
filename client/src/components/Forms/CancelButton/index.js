import React from 'react';

const CancelButton = (props) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        props.onClick(e);
    }

    return (
        <button className="link-button" onClick={handleOnClick} data-cy={props.cy || "cancel"}>
            {props.label || "Cancel"}
        </button>
    )
}

export default CancelButton;