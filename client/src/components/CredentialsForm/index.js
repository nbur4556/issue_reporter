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
                <input name="password" type="password" />
            </label>

            {(props.requireConfirm)
                ? <label>
                    Confirm Password:
                <input name="confirmPassword" type="password" />
                </label>
                : null}

            <button name="submit">Submit</button>
        </form>
    );
}

export default CredentialsForm;