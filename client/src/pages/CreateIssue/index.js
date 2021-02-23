import React, { useState } from 'react';
import './style.css';

const CreateIssue = () => {
    const [issueData, setIssueData] = useState({
        name: '',
        body: '',
        category: '',
        assigned: '',
        dueDate: '',
        comments: '',
        status: ''
    });

    // Set issue data state for form inputs
    const handleSetIssueData = e => {
        const input = e.currentTarget;
        setIssueData({ ...issueData, [input.name]: input.value });
    }

    // Create an issue on submit
    const handleCreateIssue = e => {
        e.preventDefault();

        console.log(issueData);
    }

    return (
        <article>

            {/* Input Form */}

            <form>

                <label htmlFor="name">
                    Name:
                    <input id="name" name="name" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="body">
                    Body:
                    <input id="body" name="body" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="category">
                    Category:
                    <input id="category" name="category" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="assigned">
                    Assigned:
                    <input id="assigned" name="assigned" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="dueDate">
                    Due Date:
                    <input id="dueDate" name="dueDate" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="comments">
                    Comments:
                    <input id="comments" name="comments" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="status">
                    Status:
                    <input id="status" name="status" type="text" onChange={handleSetIssueData} />
                </label>

                <button onClick={handleCreateIssue}>Submit</button>

            </form>

        </article>
    );
}

export default CreateIssue;