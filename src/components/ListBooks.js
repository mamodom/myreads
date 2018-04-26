import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Bookshelf from './Bookshelf';
import { groupBy, } from '../utlis';

export default class ListBooks extends Component {
  state = {
    shelves: {},
  }

  shelfChanged = ({ bookId, shelf, }) => {
    BooksAPI.update({ id: bookId, }, shelf)
      .then(response => this.setState(previousState => ({
        shelves: groupBy(
          Object.keys(previousState.shelves)
            .map(shelfKey => previousState.shelves[shelfKey])
            .reduce((previous, current) => [...previous, ...current,], [])
            .map(book => (book.id === bookId)
              ? { ...book, shelf, }
              : book
            )
            .filter(book => book.shelf !== 'none'),
          'shelf',
        ),
      })));
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books =>
        this.setState({
          shelves: groupBy(books, 'shelf'),
        })
      );
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.keys(this.state.shelves)
                .map(shelfKey =>
                  <Bookshelf
                    key={shelfKey}
                    title={shelfKey
                      .replace(/[A-Z]/g, str => ` ${str}`)
                      .replace(/^\w/, str => str.toUpperCase())
                    }
                    books={this.state.shelves[shelfKey]}
                    onShelfChanged={this.shelfChanged}
                  />
                )
            }
          </div>
        </div >
        <div className="open-search">
          <Link to="/search">Add a book </Link>
        </div>
      </div>
    );
  }
}
