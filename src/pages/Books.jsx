import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import BorrowModal from "../components/BorrowModal";
import { getBooksFromApi } from "../services/bookApi";
import { BOOK_CATEGORIES, APP_CONFIG } from "../config/constants";

function Books({ cart = [], onToggleCart, onBulkBorrow }) {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState(APP_CONFIG.DEFAULT_CATEGORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showBulkModal, setShowBulkModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBooksFromApi(category).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, [category]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page books-page-container">
      <h1>Our Book Collection</h1>
      <p>Add the books you need to your cart, then borrow them all together in bulk!</p>

      {/* Dynamic Category Dropdown and Search Bar */}
      <div className="search-filter-container">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          {BOOK_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Book Grid */}
      {loading ? (
        <p className="loading-text">Loading...Tab tak prompt likh le agli bug ke leya</p>
      ) : filteredBooks.length > 0 ? (
        <div className="book-container">
          {filteredBooks.map((book) => {
            const isInCart = cart.some(
              (item) => item.id === book.id || item.title === book.title
            );
            return (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                category={book.category}
                isInCart={isInCart}
                onToggleCart={onToggleCart}
              />
            );
          })}
        </div>
      ) : (
        <p>Aukat se bahar ja rha hai tu ab.</p>
      )}

      {/* Floating Bottom Bar for Bulk Borrowing when Cart is non-empty */}
      {cart.length > 0 && (
        <div className="floating-cart-bar">
          <div className="cart-bar-info">
            <span className="cart-icon-big"></span>
            <div>
              <strong>{cart.length} {cart.length === 1 ? "Book" : "Books"} Selected</strong>
              <p>Ready for bulk borrowing</p>
            </div>
          </div>

          <button
            className="primary-button proceed-borrow-btn"
            onClick={() => setShowBulkModal(true)}
          >
            Borrow Selected ({cart.length}) &rarr;
          </button>
        </div>
      )}

      {/* Bulk Borrowing Modal Dialog */}
      {showBulkModal && (
        <BorrowModal
          books={cart}
          onClose={() => setShowBulkModal(false)}
          onSubmitBulkBorrow={onBulkBorrow}
        />
      )}
    </div>
  );
}

export default Books;