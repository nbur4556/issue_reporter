import React from 'react';

const ResultMessage = (props) => {
    return (
        <p data-cy="result-msg">
            {(props.result === true) ? props.successMsg || "Success" : null}
            {(props.result === false) ? props.errorMsg ?? "Error" : null}
        </p>
    );
}

export default ResultMessage;