import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const CreateIssue = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [issueData, setIssueData] = useState({
        name: '',
        body: '',
        category: '',
        assigned: '',
        dueDate: '',
        comments: ''
    });

    // Set issue data state for form inputs
    const handleSetIssueData = e => {
        const input = e.currentTarget;
        setIssueData({ ...issueData, [input.name]: input.value });
        setSuccessMessage('');
    }

    // Create an issue on submit
    const handleCreateIssue = e => {
        e.preventDefault();

        clearFormData(e.currentTarget.parentElement);

        issueConnection.postQuery({ body: issueData }).then(result => {
            (result.status === 200)
                ? setSuccessMessage(`Success! Issue "${issueData.name}" created.`)
                : setSuccessMessage('');
        });
    }

    // Set all form input values and issue data to null
    const clearFormData = form => {
        setIssueData({
            name: '',
            body: '',
            category: '',
            assigned: '',
            dueDate: '',
            comments: ''
        });

        for (let formChild of form.children) {
            if (formChild.nodeName === 'LABEL') { formChild.children[0].value = null }
        }
    }

    return (
        <article>

            <Link to="/">Back To Workbench</Link>

            <br />

            {/* Input Form */}

            <form>

                <label htmlFor="name">
                    Name:
                    <input id="name" name="name" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="body">
                    Body:
                    <textarea id="body" name="body" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="category">
                    Category:
                    <select id="category" name="category" onChange={handleSetIssueData}>
                        <option></option>
                        <option value="Feature">Feature</option>
                        <option value="Bug">Bug</option>
                    </select>
                </label>

                <label htmlFor="assigned">
                    Assigned:
                    <input id="assigned" name="assigned" type="text" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="dueDate">
                    Due Date:
                    <input id="dueDate" name="dueDate" type="date" onChange={handleSetIssueData} />
                </label>

                <label htmlFor="comments">
                    Comments:
                    <input id="comments" name="comments" type="text" onChange={handleSetIssueData} />
                </label>

                <button onClick={handleCreateIssue}>Submit</button>

            </form>

            <br />

            {(successMessage) ? <p>{successMessage}</p> : null}

        </article>
    );
}

export default CreateIssue;