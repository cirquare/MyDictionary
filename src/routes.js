import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MyWordList from './components/MyWordList';
import NotFoundPage from './components/NotFoundPage';
import WordReview from './components/WordReview';
import WordReview_Trans from './components/WordReview_Trans';
import ReviewMode from './components/ReviewMode';

export default (
  <Route path="/">
    <IndexRedirect to="/mywordlist" />
      <Route path ="/mywordlist" component = {MyWordList} />
      <Route path ="/wordreview" component = {WordReview} />
      <Route path ="/wordreview_trans" component = {WordReview_Trans} />
      <Route path ="/reviewmode" component = {ReviewMode} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
