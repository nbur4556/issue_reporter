import React, { useState, useEffect } from 'react';

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = () => {
    const [signupActive, setSignupActive] = useState(false);
    const [loginActive, setLoginActive] = useState(false);
    const [signupMsg, setSignupMsg] = useState();
    const [loginMsg, setLoginMsg] = useState();

    const [credentialsInput, setCredentialsInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    // Clear credentials input state
    useEffect(() => {
        setCredentialsInput({
            username: '',
            password: '',
            confirmPassword: ''
        });
    }, [signupActive, loginActive]);

    // Set which form to display
    const handleSetActive = e => {
        if (e.currentTarget.name === 'loginActive') {
            setSignupActive(false);
            setLoginActive(true);
        }
        else if (e.currentTarget.name === 'signupActive') {
            setLoginActive(false);
            setSignupActive(true);
        }
    }

    // Get input from form
    const handleCredentialsInput = e => {
        setCredentialsInput({ ...credentialsInput, [e.currentTarget.name]: e.currentTarget.value })
    }

    // Create a new user
    const handleSignup = e => {
        e.preventDefault();

        userConnection.postQuery({
            body: credentialsInput
        }).then(result => {
            if (result.data) {
                setLoginMsg(null);
                setSignupMsg('Success! User created.')
            }
            else {
                setLoginMsg(null);
                setSignupMsg('Error: User not created.');
            }
        });
    }

    // Log in as existing user
    const handleLogin = e => {
        e.preventDefault();

        userConnection.postQuery({
            urlExtension: `/${credentialsInput.username}`,
            body: credentialsInput
        }).then(result => {
            console.log(result);
        });
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {(loginActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
            {(signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}

            {(signupMsg) ? <p>{signupMsg}</p> : null}
            {(loginMsg) ? <p>{loginMsg}</p> : null}
        </main>
    );
}

export default LoginSignup;