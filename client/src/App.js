import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import LoginSignup from './pages/LoginSignup';
import Workbench from './pages/Workbench';
import CreateIssue from './pages/CreateIssue';

// Components
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>

      {/* Routes */}

      <Route exact path="/" component={LoginSignup} />

      <PrivateRoute path="/workbench" component={Workbench} />
      <PrivateRoute path="/create-issue" component={CreateIssue} />

      {/* <Route exact path="/workbench">
        <Workbench />
      </Route>

      <Route exact path="/create-issue">
        <CreateIssue />
      </Route> */}

    </BrowserRouter>
  );
}

export default App;
