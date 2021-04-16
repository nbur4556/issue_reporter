import React from 'react';

const ResultMessage = (props) => {
    return (
        <p>
            {(props.result === true) ? props.positiveMsg || "Success" : null}
            {(props.result === false) ? props.negativeMsg ?? "Error" : null}
        </p>
    );
}

export default ResultMessage;