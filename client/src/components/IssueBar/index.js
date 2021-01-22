import React from 'react';

const IssueBar = props => {
    return (
        <div>
            <ul>
                <li>{props.title}</li>
                <li>{props.category}</li>
                {(props.assigned) ? <li>{props.assigned}</li> : null}
            </ul>
        </div>
    );
}

export default IssueBar;