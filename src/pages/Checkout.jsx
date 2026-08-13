import React, { useState } from "react";
import { ACADEMIC_YEARS, APP_CONFIG } from "../config/constants";

function Checkout({ cart = [], onRemoveFromCart, onClearCart, onBulkBorrow, borrowedBooks = [], onReturnBook }) {
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentYear, setStudentYear] = useState(ACADEMIC_YEARS[0]);
  const [borrowDays, setBorrowDays] = useState(APP_CONFIG.DEFAULT_BORROW_DAYS);

  const daysNum = parseInt(borrowDays, 10) || 1;
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + daysNum);
  const formattedReturnDate = returnDate.toLocaleDateString();

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentRollNo.trim()) {
      alert("Please enter Student Name and Roll Number.");
      return;
    }

    onBulkBorrow(
      studentName.trim(),
      studentRollNo.trim(),
      studentYear,
      daysNum,
      formattedReturnDate
    );
    setStudentName("");
    setStudentRollNo("");
  };

  return (
    <div className="page checkout-page">
      <h1>Borrow Cart & Active Records</h1>

      {/* SECTION 1: BULK BORROW CART */}
      <div className="checkout-section">
        <div className="section-title-row">
          <h2>🛒 Selected Books in Cart ({cart.length})</h2>
          {cart.length > 0 && (
            <button className="clear-cart-btn" onClick={onClearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-box">
            <p>Your borrowing cart is empty.</p>
            <p>Go to the <strong>Books Catalog</strong> page and add the books you need in bulk!</p>
          </div>
        ) : (
          <div className="cart-checkout-grid">
            {/* List of Cart Items */}
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={item.id || idx} className="cart-item-row">
                  <img src={item.cover} alt={item.title} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>by {item.author}</p>
                    {item.category && <span className="category-badge">{item.category}</span>}
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                    title="Remove from cart"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Bulk Borrow Form */}
            <div className="checkout-form-card">
              <h3>Complete Bulk Borrowing</h3>
              <form onSubmit={handleBulkSubmit} className="borrow-form">
                <div className="form-group">
                  <label htmlFor="checkoutName">Student Name *</label>
                  <input
                    id="checkoutName"
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkoutRoll">Roll Number / Student ID *</label>
                  <input
                    id="checkoutRoll"
                    type="text"
                    placeholder="e.g. CS2026-042"
                    value={studentRollNo}
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkoutYear">Academic Year</label>
                    <select
                      id="checkoutYear"
                      value={studentYear}
                      onChange={(e) => setStudentYear(e.target.value)}
                    >
                      {ACADEMIC_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkoutDays">Duration (Days)</label>
                    <input
                      id="checkoutDays"
                      type="number"
                      min={APP_CONFIG.MIN_BORROW_DAYS}
                      max={APP_CONFIG.MAX_BORROW_DAYS}
                      value={borrowDays}
                      onChange={(e) => setBorrowDays(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="return-date-box">
                  Expected Return: <strong>{formattedReturnDate}</strong>
                </div>

                <button type="submit" className="primary-button checkout-submit-btn">
                  Confirm Bulk Borrowing ({cart.length} Books)
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <hr className="section-divider" />

      {/* SECTION 2: ACTIVE BORROWED RECORDS */}
      <div className="checkout-section">
        <h2>Currently Borrowed Books ({borrowedBooks.length})</h2>

        {borrowedBooks.length === 0 ? (
          <p className="no-records-text">No active borrowed records yet.</p>
        ) : (
          <div className="borrowed-records-grid">
            {borrowedBooks.map((record) => (
              <div key={record.id} className="record-card">
                {record.bookCover && (
                  <img src={record.bookCover} alt={record.bookTitle} className="record-thumb" />
                )}
                <div className="record-content">
                  <h3>{record.bookTitle}</h3>
                  <p className="record-author">by {record.bookAuthor}</p>
                  <div className="record-details">
                    <p><strong>Student:</strong> {record.studentName} ({record.studentRollNo})</p>
                    <p><strong>Year:</strong> {record.studentYear}</p>
                    <p><strong>Borrowed Date:</strong> {record.borrowDate}</p>
                    <p><strong>Return Date:</strong> <span className="return-highlight">{record.returnDate}</span> ({record.borrowDays} days)</p>
                  </div>
                  <button className="return-book-btn" onClick={() => onReturnBook(record.id)}>
                    0Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;