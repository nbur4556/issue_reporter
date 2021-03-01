import React from 'react';

const CredentialsForm = props => {
    return (
        <form>
            <label>
                Username:
                <input name="username" type="text" />
            </label>
            <label>
                Password:
                <input name="password" type="text" />
            </label>
            <label>
                Confirm Password:
                <input name="confirmPassword" type="text" />
            </label>
            <button name="submit">Submit</button>
        </form>
    );
}

export default CredentialsForm;