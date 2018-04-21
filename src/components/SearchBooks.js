import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class SearchBooks extends Component {
  state = {
    searchResults: [],
  }

  searchTermChanged = e => {
    const searchTerm = e.target.value;

    if (!searchTerm) {
      this.setState({ searchResults: [], });
      return;
    }

    BooksAPI.search(searchTerm)
      .then(results => {
        if (!results.error)
          this.setState({
            searchResults: results || [],
          });
      });
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
                <Book {...book} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
