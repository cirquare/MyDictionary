import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MyWordList from './components/MyWordList';
import UsersPage from './components/UsersPage';
import SingleUserPage from './components/SingleUserPage';
import NotFoundPage from './components/NotFoundPage';
import WordReview from './components/WordReview';

export default (
  <Route path="/">
    <IndexRedirect to="/mywordlist" />
      <Route path ="/mywordlist" component = {MyWordList} />
      <Route path ="/wordreview" component = {WordReview} />
      <Route path ="/users" component={UsersPage} />
      <Route path ="/users/:username" component={SingleUserPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
