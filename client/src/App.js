import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import LoginSignup from './pages/LoginSignup';
import Workbench from './pages/Workbench';
import CreateIssue from './pages/CreateIssue';

// Components
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const handleUpdateAuthToken = () => setAuthToken(localStorage.getItem('authToken'));

  return (
    <BrowserRouter>

      {/* Public Routes */}
      <Route exact path="/">
        <LoginSignup updateAuthToken={handleUpdateAuthToken} />
      </Route>

      {/* Private Routes */}
      <PrivateRoute path="/workbench" component={Workbench} authToken={authToken} />
      <PrivateRoute path="/create-issue" component={CreateIssue} authToken={authToken} />

    </BrowserRouter>
  );
}

export default App;
