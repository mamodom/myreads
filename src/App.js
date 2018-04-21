import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import SeachBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path='/' exact render={() => <ListBooks />} />
        <Route path='/search' render={() => <SeachBooks />} />
      </div>
    );
  }
}

export default BooksApp;
