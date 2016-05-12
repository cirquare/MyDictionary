import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MyWordList from './components/MyWordList';
import UsersPage from './components/UsersPage';
import SingleUserPage from './components/SingleUserPage';
import NotFoundPage from './components/NotFoundPage';


export default (
  <Route path="/">
    <IndexRedirect to="/mywordlist" />
      <Route path ="/mywordlist" component={MyWordList} />
      <Route path ="/users" component={UsersPage} />
      <Route path ="/users/:username" component={SingleUserPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
