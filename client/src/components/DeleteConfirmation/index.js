import React from 'react';

const DeleteConfirmation = (props) => {
    const message = `Are you sure you want to delete this ${props.type}? This can not be undone.`;

    return (
        <div>
            <p>{props.messageOverride || message}</p>
            <button className="link-button" name="confirmDelete" onClick={props.onConfirm} data-cy="confirmDelete">
                {props.confirmChoice || 'Yes'}
            </button>
            <button className="link-button" name="cancelDelete" onClick={props.onReject} data-cy="cancelDelete">
                {props.rejectChoice || 'No'}
            </button>
        </div>
    );
}

export default DeleteConfirmation;