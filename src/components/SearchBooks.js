import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import { DebounceInput, } from 'react-debounce-input';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class SearchBooks extends Component {
  state = {
    searchResults: [],
    searchTerm: '',
  }

  searchTermChanged = e => {
    const searchTerm = e.target.value;

    this.setState({
      searchTerm,
    });

    if (!searchTerm) {
      this.setState({
        searchResults: [],
        error: null,
      });
      return;
    }

    BooksAPI.search(searchTerm)
      .then((results = []) => {
        if (this.state.searchTerm !== searchTerm)
          return;
        if (!results.error) {
          const shelvedResults = results.map(book => ({
            ...book,
            shelf: (this.props.books.find(b => b.id === book.id) || { shelf: 'none', }).shelf,
          }));

          this.setState({
            searchResults: shelvedResults,
            error: null,
          });
        }
        else
          this.setState({
            searchResults: [],
            error: results.error,
          });
      });
  }

  shelfChanged = ({ book, shelf, }) => {
    this.props.onShelfChanged({ book, shelf, });

    this.setState(previous => ({
      searchResults: previous.searchResults
        .map(b => (b.id === book.id) ? { ...b, shelf, } : b),
    }));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput type="text"
              debounceTimeout={300}
              placeholder="Search by title or author"
              onChange={this.searchTermChanged}
              value={this.state.searchTerm} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (this.state.error && <span>Books not found.</span>) ||
              this.state.searchResults.map(book =>
                <li key={book.id}>
                  <Book book={book} onShelfChanged={this.shelfChanged} />
                </li>
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}
