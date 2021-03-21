import React from 'react';

const FormContainer = (props) => {
    const { ...rest } = props.children;

    return (
        <form>
            {rest}
        </form>
    )
}

export default FormContainer;