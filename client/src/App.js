import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './stylesheets/reset.css';
import './stylesheets/index.css';

// Pages
import LoginSignup from './pages/LoginSignup';
import Workbench from './pages/Workbench';
import NotFound from './pages/NotFound';

// Components
import PrivateRoute from './components/PrivateRoute';

// Utilities
import ApiConnection from './utils/ApiConnection';
const authConnection = new ApiConnection('/api/authenticate');

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isAuthorized, setIsAuthorized] = useState(false)

  // Check for authorization on auth token change
  useEffect(() => {
    setIsAuthorized(false);

    authConnection.getQuery({ urlExtension: `/${authToken}` }).then(({ data }) => {
      const authIdConfirmed = (data?._id) ? true : false;
      setIsAuthorized(authIdConfirmed);
    });
  }, [authToken])

  const handleUpdateAuthToken = () => {
    setAuthToken(localStorage.getItem('authToken'));
  }

  return (
    <BrowserRouter>
      <Switch>

        {/* Private Routes */}

        <PrivateRoute path="/workbench" component={Workbench} authToken={authToken} isAuthorized={isAuthorized} />

        {/* Public Routes */}

        <Route exact path="/">
          <LoginSignup updateAuthToken={handleUpdateAuthToken} />
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>

      {/* Redirects */}
      {(isAuthorized) ? <Redirect to='/workbench' /> : null}
    </BrowserRouter>
  );
}

export default App;
