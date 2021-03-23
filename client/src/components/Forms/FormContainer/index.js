import React from 'react';

const FormContainer = (props) => {
    return (
        <form>
            {props.children}
        </form>
    )
}

export default FormContainer;