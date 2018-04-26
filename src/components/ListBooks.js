import React from 'react';
import { Link, } from 'react-router-dom';

import Bookshelf from './Bookshelf';
import { groupBy, } from '../utlis';

const ListBooks = ({ books, onShelfChanged, }) => {
  const shelves = groupBy(books, 'shelf');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            Object.keys(shelves)
              .sort()
              .map(shelfKey =>
                <Bookshelf
                  key={shelfKey}
                  title={shelfKey
                    .replace(/[A-Z]/g, str => ` ${str}`)
                    .replace(/^\w/, str => str.toUpperCase())
                  }
                  books={shelves[shelfKey]}
                  onShelfChanged={onShelfChanged}
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
};

export default ListBooks;
