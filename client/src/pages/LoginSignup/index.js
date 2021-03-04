import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = () => {

    const [loginState, setLoginState] = useState({
        isActive: false,
        isSuccess: false,
        msg: ''
    });

    const [signupActive, setSignupActive] = useState(false);
    const [signupMsg, setSignupMsg] = useState();

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

        setSignupMsg(null);
        setLoginState({ ...loginState, msg: null });
    }, [signupActive]);

    // Set which form to display
    const handleSetActive = e => {
        if (e.currentTarget.name === 'loginActive') {
            setSignupActive(false);
            setLoginState({ ...loginState, isActive: true });
        }
        else if (e.currentTarget.name === 'signupActive') {
            setLoginState({ ...loginState, isActive: false });
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
        }).then((result) => {
            (result.data._id)
                ? setSignupMsg('Success! User created.')
                : setSignupMsg('Error: User not created.');
        }).catch(err => setSignupMsg('Error: User not created.'));
    }

    // Log in as existing user
    const handleLogin = e => {
        e.preventDefault();

        userConnection.postQuery({
            urlExtension: `/${credentialsInput.username}`,
            body: credentialsInput
        }).then((result) => {
            if (result.data.authToken) {
                localStorage.setItem('authToken', result.data.authToken);
                setLoginState({ ...loginState, isSuccess: true, msg: 'Success! Login successful.' });
            }
            else {
                localStorage.removeItem('authToken');
                setLoginState({ ...loginState, isSuccess: false, msg: 'Error: Login not successful.' });
            }
        }).catch(err => {
            localStorage.removeItem('authToken');
            setLoginState({ ...loginState, isSuccess: false, msg: 'Error: Login not successful.' });
        });
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {(loginState.isActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
            {(signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}

            {(signupMsg) ? <p>{signupMsg}</p> : null}
            {(loginState.msg) ? <p>{loginState.msg}</p> : null}

            {(loginState.isSuccess) ? <Redirect to='/workbench' /> : null}
        </main>
    );
}

export default LoginSignup;