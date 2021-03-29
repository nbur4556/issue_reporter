import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './stylesheets/reset.css';
import './stylesheets/main.css';

// Pages
import LoginSignup from './pages/LoginSignup';
import Workbench from './pages/Workbench';
import CreateProject from './pages/CreateProject';

// Components
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const handleUpdateAuthToken = () => {
    setAuthToken(localStorage.getItem('authToken'));
  }

  return (
    <BrowserRouter>

      {/* Private Routes */}
      <PrivateRoute path="/workbench" component={Workbench} authToken={authToken} />
      <PrivateRoute path="/create-project" component={CreateProject} authToken={authToken} />

      {/* Public Routes */}
      <Route exact path="/">
        <LoginSignup updateAuthToken={handleUpdateAuthToken} />
      </Route>

    </BrowserRouter>
  );
}

export default App;
