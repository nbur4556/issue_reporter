import React from 'react';
import './style.css';

const CreateIssue = () => {

    const handleCreateIssue = e => {
        e.preventDefault();
        const createIssueForm = e.currentTarget.parentElement;

        console.log(createIssueForm);
    }

    return (
        <article>

            {/* Input Form */}

            <form>

                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" />

                <label htmlFor="body">Body</label>
                <input id="body" name="body" type="text" />

                <label htmlFor="category">Category</label>
                <input id="category" name="category" type="text" />

                <label htmlFor="assigned">Assigned</label>
                <input id="assigned" name="assigned" type="text" />

                <label htmlFor="dueDate">Due Date</label>
                <input id="dueDate" name="dueDate" type="text" />

                <label htmlFor="comments">Comments</label>
                <input id="comments" name="comments" type="text" />

                <label htmlFor="status">Status</label>
                <input id="status" name="status" type="text" />

                <button onClick={handleCreateIssue}>Submit</button>

            </form>

        </article>
    );
}

export default CreateIssue;