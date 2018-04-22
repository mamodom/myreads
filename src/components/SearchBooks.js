import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class SearchBooks extends Component {
  state = {
    searchResults: [],
    searchTerm: '',
  }

  updateSearch = () => {
    if (!this.state.searchTerm) {
      this.setState({ searchResults: [], });
      return;
    }

    BooksAPI.search(this.state.searchTerm)
      .then(results => {
        if (!results.error)
          this.setState({
            searchResults: results || [],
          });
        else
          this.setState({ searchResults: [], });
      });
  }

  searchTermChanged = e => {
    const searchTerm = e.target.value;

    this.setState({
      searchTerm,
    });

    this.updateSearch();
  }

  shelfChanged = ({ bookId, shelf, }) => {
    BooksAPI.update({ id: bookId, }, shelf)
      .then(response => this.updateSearch());
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchTermChanged} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(book =>
              <li key={book.id}>
                <Book {...book} onShelfChanged={this.shelfChanged} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
