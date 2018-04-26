import React from 'react';
import { Route, } from 'react-router-dom';

import './App.css';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({ books, }));
  }

  shelfChanged = ({ book, shelf, }) => {
    BooksAPI.update(book, shelf)
      .then(_ =>
        this.setState(previousState => ({
          books: previousState.books
            .filter(b => b.id !== book.id)
            .concat([{ ...book, shelf, },])
            .filter(b => b.shelf !== 'none'),
        }))
      );
  }

  render() {
    return (
      <div className="app">
        <Route path='/' exact render={() => <ListBooks books={this.state.books} onShelfChanged={this.shelfChanged} />} />
        <Route path='/search' render={() => <SearchBooks books={this.state.books} onShelfChanged={this.shelfChanged} />} />
      </div>
    );
  }
}

export default BooksApp;
