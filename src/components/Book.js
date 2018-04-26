import React from 'react';

const Book = ({ book, onShelfChanged, }) => {
  const { authors = [], title, imageLinks, shelf, } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")`,
        }}>
        </div>
        <div className="book-shelf-changer">
          <select value={shelf || 'none'} onChange={e =>
            onShelfChanged({
              shelf: e.target.value,
              book,
            })
          }>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {
          authors.reduce((acc, value, i) =>
            (acc.length && [...acc, <br key={i} />, value,]) || [value,], []
          )
        }
      </div>
    </div>
  );
};

export default Book;
