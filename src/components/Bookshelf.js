import React from 'react';

import Book from './Book';

const Bookshelf = ({ title, books = [] }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map(book =>
            <li key={book.title}>
              <Book
                backgroundImageUrl={book.backgroundImageUrl}
                title={book.title}
                author={book.author}
              />
            </li>)
        }
      </ol>
    </div>
  </div>
);

export default Bookshelf;
