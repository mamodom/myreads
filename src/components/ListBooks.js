import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Bookshelf from './Bookshelf';
import { groupBy } from '../utlis';

export default class ListBooks extends Component {
  state = {
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books =>
        this.setState({
          shelves: groupBy(books, 'shelf')
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
                .map(shelfName =>
                  <Bookshelf
                    key={shelfName}
                    title={shelfName}
                    books={this.state.shelves[shelfName]} />
                )
            }
          </div>
        </div >
        <div className="open-search">
          <Link to="/search" >Add a book </Link>
        </div>
      </div>
    );
  }
}
