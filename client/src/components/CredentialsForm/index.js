import React from 'react';

const CredentialsForm = props => {
    return (
        <form>
            <label>
                Username:
                <input name="username" type="text" onChange={props.handleOnChange} />
            </label>
            <label>
                Password:
                <input name="password" type="password" onChange={props.handleOnChange} />
            </label>

            {(props.requireConfirm)
                ? <label>
                    Confirm Password:
                <input name="confirmPassword" type="password" onChange={props.handleOnChange} />
                </label>
                : null}

            <button name="submit">Submit</button>
        </form>
    );
}

export default CredentialsForm;