import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import Workbench from './pages/Workbench';
import CreateIssue from './pages/CreateIssue';

function App() {
  return (
    <BrowserRouter>

      {/* Routes */}

      <Route exact path="/">
        <Workbench />
      </Route>
      <Route exact path="/create-issue">
        <CreateIssue />
      </Route>

    </BrowserRouter>
  );
}

export default App;
