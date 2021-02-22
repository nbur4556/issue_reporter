import React from 'react';
import './style.css';

const CreateIssue = () => {
    return (
        <article>

            {/* Input Form */}

            <form>
                <label>Name</label>
                <input type="text" />
                <label>Body</label>
                <input type="text" />
                <label>Category</label>
                <input type="text" />
                <label>Assigned</label>
                <input type="text" />
                <label>Due Date</label>
                <input type="text" />
                <label>Comments</label>
                <input type="text" />
                <label>Status</label>
                <input type="text" />
            </form>

        </article>
    );
}

export default CreateIssue;