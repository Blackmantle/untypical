import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import ScrollToTop from 'components/ScrollToTop';
import UsersList from 'components/UsersList';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box p={4}>
        <Box m="0 auto" maxWidth={500}>
          <Switch>
            <Route path="/">
              <UsersList />
            </Route>
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
